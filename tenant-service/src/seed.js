import { Tenant } from "./models";

const tenants = [
  {
    id: 1,
    roomId: "101",
    contractCode: "CT101",
    startDate: "2025-12-15",
  },
  {
    id: 2,
    roomId: "102",
    contractCode: "CT102",
    startDate: "2025-12-15",
  },
  {
    id: 3,
    roomId: "103",
    contractCode: "CT103",
    startDate: "2025-12-15",
  },
  {
    id: 4,
    roomId: "104",
    contractCode: "CT104",
    startDate: "2025-12-15",
  },
  {
    id: 5,
    roomId: "105",
    contractCode: "CT105",
    startDate: "2025-12-15",
  },
  {
    id: 6,
    roomId: "106",
    contractCode: "CT106",
    startDate: "2025-12-15",
  },
  {
    id: 7,
    roomId: "107",
    contractCode: "CT107",
    startDate: "2025-12-15",
  },
  {
    id: 8,
    roomId: "108",
    contractCode: "CT108",
    startDate: "2025-12-15",
  },
  {
    id: 9,
    roomId: "109",
    contractCode: "CT109",
    startDate: "2025-12-15",
  },
  {
    id: 10,
    roomId: "110",
    contractCode: "CT110",
    startDate: "2025-12-15",
  },
];

(async () => {
  try {
    await Tenant.bulkCreate(tenants);
    console.log("Đã thêm dữ liệu mẫu");
  } catch (error) {
    console.log("Có lỗi xảy ra khi thêm mẫu");
  }
})();
