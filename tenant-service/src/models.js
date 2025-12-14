// Tạo các model
import { DataTypes } from "sequelize";
import sequelize from "./db";

export const Tenant = sequelize.define(
  "tenants",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    roomId: {
      field: "room_id",
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    contractCode: {
      field: "contract_code",
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: "Mã hợp đồng",
    },
    startDate: {
      field: "start_date",
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Ngày bắt đầu thuê",
    },
    endDate: {
      field: "end_date",
      type: DataTypes.DATEONLY,
      comment: "Ngày kết thúc thuê",
    },
  },
  { timestamps: false } // Không tạo createdAt và updatedAt
);
