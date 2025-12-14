import { Room } from "./models";

const rooms = [
  {
    id: 101,
    name: "P101",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 102,
    name: "P102",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 103,
    name: "P103",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 104,
    name: "P104",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 105,
    name: "P105",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 106,
    name: "P106",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 107,
    name: "P107",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 108,
    name: "P108",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 109,
    name: "P109",
    price: 1500000,
    status: "avaliable",
  },
  {
    id: 110,
    name: "P110",
    price: 1500000,
    status: "avaliable",
  },
];

(async () => {
  try {
    await Room.bulkCreate(rooms);
    console.log("Đã thêm dữ liệu mẫu");
  } catch (error) {
    console.log("Có lỗi xảy ra khi thêm mẫu");
  }
})();
