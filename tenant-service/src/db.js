// Kết nối CSDL
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Kết nối cơ sở dữ liệu thất bại:", error);
  }
})();

export default sequelize;
