import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Payment } from "./models";
import client from "prom-client";

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Tạo thông tin thanh toán
// Admin tạo thông tin thanh toán cho một khách thuê với các thông tin cần thiết
app.post("/create-payment", async (req, res) => {
  const { tenantId, month, year, dueDate, oldElectricity, newElectricity, oldWater, newWater } = req.body;
  if (!tenantId || !month || !year || !oldElectricity || !newElectricity || !oldWater || !newWater) {
    return res.status(400).json({ error: "Thiếu thông tin" });
  }
  const payment = await Payment.create({
    tenantId,
    month,
    year,
    dueDate,
    oldElectricity,
    newElectricity,
    oldWater,
    newWater,
  });
  res.json({ id: payment.id });
});

// Lấy danh sách tất cả payments
app.get("/payments", async (_req, res) => {
  const payments = await Payment.findAll();
  res.json(payments);
});

// Lấy payment theo id
app.get("/payment/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Thiếu payment id" });
  const payment = await Payment.findOne({ where: { id: id } });
  if (!payment) return res.status(404).json({ error: "Không tìm thấy thông tin thanh toán" });
  res.json(payment);
});

// Lấy payment theo tenant id
app.get("/payment/:tenantId", async (req, res) => {
  const { tenantId } = req.params;
  if (!tenantId) return res.status(400).json({ error: "Thiếu tenant id" });
  const payment = await Payment.findOne({ where: { tenantId: tenantId } });
  if (!payment) return res.status(404).json({ error: "Không tìm thấy thông tin thanh toán" });
  res.json(payment);
});

// Lấy payment theo user id
app.get("/payment/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "Thiếu user id" });
  const payment = await Payment.findOne({ where: { userId: userId } });
  if (!payment) return res.status(404).json({ error: "Không tìm thấy thông tin thanh toán" });
  res.json(payment);
});

// Cập nhật payment
app.put("/payment/:id", async (req, res) => {
  const { id } = req.params;
  const { tenantId, month, year, dueDate, oldElectricity, newElectricity, oldWater, newWater } = req.body;
  if (!id) return res.status(400).json({ error: "Thiếu payment id" });

  const payment = await Payment.findOne({ where: { id: id } });
  if (!payment) return res.status(404).json({ error: "Không tìm thấy payment" });

  const updates = { tenantId, month, year, dueDate, oldElectricity, newElectricity, oldWater, newWater };

  const result = await payment.update(updates);
  res.json(result);
});

app.delete("/payment/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Thiếu payment id" });
  const payment = await Payment.findOne({ where: { id: id } });
  if (!payment) return res.status(404).json({ error: "Không tìm thấy payment" });
  const result = await Payment.destroy({ where: { id: id } });
  res.json({ message: "Đã xóa payment: " + result });
});

app.listen(PORT, () => {
  console.log(`Dịch vụ đang chạy tại http://localhost:${PORT}`);
});
