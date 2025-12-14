import bcrypt from "bcryptjs";
import { User } from "./models";

let users = [
  {
    id: 0,
    fullName: "Admin",
    phoneNumber: "0999999999",
    email: "admin@example.com",
    dob: "1995-01-10",
    password: "password",
    role: "admin",
  },
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    phoneNumber: "0900000001",
    email: "nguyenvana1@example.com",
    dob: "1995-01-10",
    tenantId: 1,
    password: "password",
  },
  {
    id: 2,
    fullName: "Nguyễn Văn B",
    phoneNumber: "0900000002",
    email: "nguyenvanb2@example.com",
    dob: "1996-02-15",
    tenantId: 2,
    password: "password",
  },
  {
    id: 3,
    fullName: "Nguyễn Văn C",
    phoneNumber: "0900000003",
    email: "nguyenvanc3@example.com",
    dob: "1994-03-20",
    tenantId: 3,
    password: "password",
  },
  {
    id: 4,
    fullName: "Nguyễn Văn D",
    phoneNumber: "0900000004",
    email: "nguyenvand4@example.com",
    dob: "1993-04-12",
    tenantId: 4,
    password: "password",
  },
  {
    id: 5,
    fullName: "Nguyễn Văn E",
    phoneNumber: "0900000005",
    email: "nguyenvane5@example.com",
    dob: "1997-05-05",
    tenantId: 5,
    password: "password",
  },
  {
    id: 6,
    fullName: "Nguyễn Văn F",
    phoneNumber: "0900000006",
    email: "nguyenvanf6@example.com",
    dob: "1992-06-18",
    tenantId: 6,
    password: "password",
  },
  {
    id: 7,
    fullName: "Nguyễn Văn G",
    phoneNumber: "0900000007",
    email: "nguyenvang7@example.com",
    dob: "1991-07-22",
    tenantId: 7,
    password: "password",
  },
  {
    id: 8,
    fullName: "Nguyễn Văn H",
    phoneNumber: "0900000008",
    email: "nguyenvanh8@example.com",
    dob: "1998-08-30",
    tenantId: 8,
    password: "password",
  },
  {
    id: 9,
    fullName: "Nguyễn Văn I",
    phoneNumber: "0900000009",
    email: "nguyenvani9@example.com",
    dob: "1990-09-14",
    tenantId: 9,
    password: "password",
  },
  {
    id: 10,
    fullName: "Nguyễn Văn K",
    phoneNumber: "0900000010",
    email: "nguyenvank10@example.com",
    dob: "1999-10-01",
    tenantId: 10,
    password: "password",
  },
];

(async () => {
  const salt = await bcrypt.genSalt(10);
  users.map((u) => {
    const hash = bcrypt.hashSync(u.password, salt);
    u.password = hash;
  });

  try {
    await User.bulkCreate(users);
    console.log("Đã thêm dữ liệu mẫu");
  } catch (error) {
    console.log("Có lỗi xảy ra khi thêm mẫu");
  }
})();
