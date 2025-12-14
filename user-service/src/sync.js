// Đồng bộ các model với CSDL
import * as _ from "./models"
import sequelize from "./db";

sequelize.sync({ alter: true }).then(() => {
  console.log("Đồng bộ model thành công: " + JSON.stringify(Object.keys(sequelize.models)));
});
