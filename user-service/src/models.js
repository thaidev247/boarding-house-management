// Tạo các model
import { DataTypes } from "sequelize";
import sequelize from "./db";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fullName: {
      field: "full_name",
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Họ và tên",
    },
    dob: {
      type: DataTypes.DATEONLY,
      comment: "Ngày sinh",
    },
    phoneNumber: {
      field: "phone_number",
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      comment: "Số điện thoại",
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      comment: "Địa chỉ email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Mật khẩu đã băm",
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
      comment: "Vai trò",
    },
    tenantId: {
      field: "tenant_id",
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false } // Không tạo createdAt và updatedAt
);
