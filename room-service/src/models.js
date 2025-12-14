// Tạo các model
import { DataTypes } from "sequelize";
import sequelize from "./db";

export const Room = sequelize.define(
  "rooms",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      comment: "Tên phòng",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Giá phòng",
    },
    status: {
      type: DataTypes.ENUM("avaliable", "occupied"),
      allowNull: false,
      comment: "Trạng thái phòng",
    },
  },
  { timestamps: false } // Không tạo createdAt và updatedAt
);
