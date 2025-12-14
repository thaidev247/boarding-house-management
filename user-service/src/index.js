import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { User } from "./models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "prom-client";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Tạo tài khoản người dùng
app.post("/register", async (req, res) => {
  const { phoneNumber, fullName, password, dob, email, tenantId } = req.body;
  if (!phoneNumber || !fullName || !password) {
    return res.status(400).json({ error: "Thiếu thông tin đăng ký!" });
  }

  if (await User.findOne({ where: { phoneNumber: phoneNumber } })) {
    return res.status(409).json({ error: "Số điện thoại đã được sử dụng" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullName,
    phoneNumber,
    password: hash,
    dob,
    email,
    tenantId,
  });

  res.status(209).json({ id: user.id });
});

// Lấy danh sách tất cả người dùng
// Chỉ admin mới có quyền xem danh sách người dùng
app.get("/users", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Không có quyền truy cập" });
  }
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
});

// Lấy thông tin một user bằng id
// Chỉ admin mới có quyền xem thông tin người dùng bằng id
app.get("/user/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Không có quyền truy cập" });
  }
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id }, attributes: { exclude: ["password"] } });
  if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });
  res.json(user);
});

// Cập nhật thông tin người dùng
// Người dùng có thể cập nhật thông tin của chính mình
// Admin có quyền cập nhật thông tin của người dùng và cập nhật vai trò
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  if (req.user.id !== id || req.user.role !== "admin") {
    return res.status(403).json({ error: "Không có quyền truy cập" });
  }
  const { fullName, password, dob, email, role } = req.body;

  if (req.user.role !== "admin" && role) {
    return res.status(403).json({ error: "Không có quyền truy cập" });
  }

  const user = await User.findOne({ where: { id: id } });
  if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });

  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(password, salt);
  }
  if (dob) updates.dob = dob;
  if (email) updates.email = email;
  if (role) updates.role = role;

  await user.update(updates);
  res.json({ message: "Cập nhật thành công" });
});

// Xóa tài khoản người dùng
// Chỉ admin mới có quyền xóa
app.delete("/user/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Không có quyền truy cập" });
  }
  const { id } = req.params;
  if (!id) return res.status(404).json({ error: "Tài khoản không tồn tại" });
  await User.destroy({ where: { id: id } });
  res.json({ message: "Đã xóa tài khoản: " + id });
});

// Đăng nhập, trả về JWT
app.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ where: { phoneNumber: phoneNumber }, attributes: ["id", "role", "password"] });
  if (!user) return res.status(401).json({ error: "Số điện thoại chưa đăng ký" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Mật khẩu không đúng" });

  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.json({ token });
});

// Lấy thông tin user đã đăng nhập
app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id }, attributes: { exclude: ["password"] } });

  if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });
  res.json(user);
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Thiếu token" });

  const token = auth.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // attach vào req
    next();
  } catch {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }
}

app.listen(PORT, () => {
  console.log(`Dịch vụ đang chạy tại cổng:${PORT}`);
});
