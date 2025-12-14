import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Room } from "./models";
import client from "prom-client";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Tạo phòng
// TODO: Chỉ admin có quyền tạo phòng
app.post("/create-room", async (req, res) => {
  const { id, name, price, status } = req.body;
  if (!id || !name || !price || !status) {
    return res.status(400).json({ error: "Thiếu thông tin" });
  }
  if (await Room.findOne({ where: { id: id } })) {
    return res.status(409).json({ error: "Phòng đã tồn tại" });
  }
  const room = await Room.create({ id: id, name: name, price: price, status: status });
  res.status(209).json({ id: room.id });
});

// Lấy danh sách tất cả các phòng (theo phòng)
// TODO: Chỉ admin mới có quyền xem danh sách phòng
app.get("/rooms", async (_req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
});

app.get("/room/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Thiếu room id" });
  const room = await Room.findOne({ where: { id: id } });
  if (!room) return res.status(404).json({ error: "Không tìm thấy phòng" });
  res.json(room);
});

// Cập nhật thông tin phòng
// TODO: Chỉ admin mới có quyền cập nhật thông tin phòng
app.put("/room/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, status } = req.body;
  if (!id) return res.status(400).json({ error: "Thiếu room id" });

  const room = await Room.findOne({ where: { id: id } });
  if (!room) return res.status(404).json({ error: "Không tìm thấy room" });

  const updates = {};
  if (name) updates.name = name;
  if (price) updates.price = price;
  if (status) updates.status = status;

  const result = await room.update(updates);
  res.json(result);
});

// Xóa phòng
// TODO: Chỉ admin mới có quyền xóa phòng
app.delete("/room/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Thiếu room id" });
  const room = await Room.findOne({ where: { id: id } });
  if (!room) return res.status(404).json({ error: "Không tìm thấy room" });
  const result = await Room.destroy({ where: { id: id } });
  res.json({ message: "Đã xóa room: " + result });
});

app.listen(PORT, () => {
  console.log(`Dịch vụ đang chạy tại http://localhost:${PORT}`);
});
