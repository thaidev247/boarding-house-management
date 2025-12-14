// Tạo các model
import { DataTypes } from "sequelize";
import sequelize from "./db";

export const WATER_PRICE = 10000;
export const ELECTRICITY_PRICE = 5000;

const Payment = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenantId: {
      field: "tenant_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Khách hàng thanh toán (theo phòng)",
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      comment: "Người dùng thực hiện thanh toán",
    },
    month: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 12 },
      allowNull: false,
      comment: "Tháng",
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Năm",
    },
    dueDate: {
      field: "due_date",
      type: DataTypes.DATEONLY,
      comment: "Hạn thanh toán",
    },
    oldElectricity: {
      field: "old_electricity",
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Chỉ số điện cũ",
    },
    newElectricity: {
      field: "new_electricity",
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Chỉ số điện mới",
    },
    oldWater: {
      field: "old_water",
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Chỉ số nước cũ",
    },
    newWater: {
      field: "new_water",
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Chỉ số nước mới",
    },
    transactionCode: {
      field: "transaction_code",
      type: DataTypes.STRING(64),
      unique: true,
      comment: "Mã giao dịch",
    },
    method: {
      type: DataTypes.ENUM("cash", "transfer"),
      comment: "Phương thức thanh toán",
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
      allowNull: false,
      comment: "Trạng thái thanh toán",
      defaultValue: "pending",
    },
  },
  { timestamps: false } // Không tạo createdAt và updatedAt
);

export { Payment };
