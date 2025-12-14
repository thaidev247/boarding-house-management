import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getRoom, getTenant, getUsers } from "../../actions";
import { cookies } from "next/headers";

export default async function UsersPage() {
  const token = (await cookies()).get("token")?.value;
  const users = (await getUsers(token!)) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
        <Button>Thêm người dùng</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(async (user: any) => {
            let tenant, room;
            if (user.tenantId) tenant = await getTenant(token!, user.tenantId);
            if (tenant) room = await getRoom(token!, tenant.roomId);
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{room?.name}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.dob ? new Date(user.dob).toLocaleDateString("vi-VN") : ""}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role === "admin" ? "Admin" : "User"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
