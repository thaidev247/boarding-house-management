import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getRooms } from "../../actions";
import { cookies } from "next/headers";

export default async function RoomsPage() {
  const token = (await cookies()).get("token")?.value;
  const rooms = (await getRooms(token!)) || [];
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Quản lý phòng</h2>
        <Button>Thêm phòng</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Giá (VNĐ)</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room: any) => (
            <TableRow key={room.id}>
              <TableCell>{room.id}</TableCell>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.price}</TableCell>
              <TableCell>{room.status == "avaliable" ? "Chưa thuê" : "Đã thuê"}</TableCell>
              <TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
