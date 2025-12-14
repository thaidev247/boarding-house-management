import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Tenant } from "./models";
import client from "prom-client";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Tạo khách thuê
// TODO: Chỉ admin có quyền tạo khách thuê
app.post("/create-tenant", async (req, res) => {
  const { roomId, contractCode, startDate } = req.body;
  if (!roomId || !contractCode || !startDate) {
    return res.status(400).json({ error: "Thiếu thông tin!" });
  }
  if (await Tenant.findOne({ where: { roomId: roomId } })) {
    return res.status(409).json({ error: "Phòng đã được thuê" });
  }
  if (await Tenant.findOne({ where: { contractCode: contractCode } })) {
    return res.status(409).json({ error: "Mã hợp đồng đã tồn tại" });
  }
  const tenant = await Tenant.create({ roomId: roomId, contractCode: contractCode, startDate: startDate });
  res.status(209).json({ id: tenant.id });
});

// Lấy danh sách tất cả các khách thuê (theo phòng)
// TODO: Chỉ admin mới có quyền xem danh sách khách thuê
app.get("/tenants", async (_req, res) => {
  const tenants = await Tenant.findAll();
  res.json(tenants);
});

app.get("/tenant/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Thiếu tenant id" });
  const tenant = await Tenant.findOne({ where: { id: id } });
  if (!tenant) return res.status(404).json({ error: "Không tìm thấy khách thuê" });
  res.json(tenant);
});

// Cập nhật thông tin khách thuê
// TODO: Chỉ admin mới có quyền cập nhật thông tin khách thuê
app.put("/tenant/:id", async (req, res) => {
  const { id } = req.params;
  const { roomId, contractCode, startDate, endDate } = req.body;
  if (!id) return res.status(400).json({ error: "Thiếu tenant id" });

  const tenant = await Tenant.findOne({ where: { id: id } });
  if (!tenant) return res.status(404).json({ error: "Không tìm thấy tenant" });

  const updates = {};
  if (roomId) updates.roomId = roomId;
  if (contractCode) updates.contractCode = contractCode;
  if (startDate) updates.startDate = startDate;
  if (endDate) updates.endDate = endDate;

  const result = await tenant.update(updates);
  res.json(result);
});

// Xóa khách thuê
// TODO: Chỉ admin mới có quyền xóa khách thuê
app.delete("/tenant/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Thiếu tenant id" });
  const tenant = await Tenant.findOne({ where: { id: id } });
  if (!tenant) return res.status(404).json({ error: "Không tìm thấy tenant" });
  const result = await Tenant.destroy({ where: { id: id } });
  res.json({ message: "Đã xóa tenant: " + result });
});

app.listen(PORT, () => {
  console.log(`Dịch vụ đang chạy tại http://localhost:${PORT}`);
});
