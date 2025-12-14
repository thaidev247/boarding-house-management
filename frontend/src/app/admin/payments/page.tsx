import { getPayments, getRoom, getTenant, getUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cookies } from "next/headers";

export default async function PaymentsPage() {
  const token = (await cookies()).get("token")?.value;
  const payments = (await getPayments(token!)) || [];
  const ELECTRICITY_PRICE = 5000;
  const WATER_PRICE = 10000;
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Payment Management</h2>
        <Button>Add Payment</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Người dùng</TableHead>
            <TableHead>Tháng</TableHead>
            <TableHead>Năm</TableHead>
            <TableHead>Mã giao dịch</TableHead>
            <TableHead>Phương thức</TableHead>
            <TableHead>Điện cũ</TableHead>
            <TableHead>Điện mới</TableHead>
            <TableHead>Nước cũ</TableHead>
            <TableHead>Nước mới</TableHead>
            <TableHead>Tổng tiền (VNĐ)</TableHead>
            <TableHead>Hạn nộp</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map(async (payment: any) => {
            const user = await getUser(token!, payment.userId);
            const tenant = await getTenant(token!, payment.tenantId);
            const room = await getRoom(token!, tenant.roomId);
            const fee =
              (payment.newElectricity - payment.oldElectricity) * ELECTRICITY_PRICE +
              (payment.newWater - payment.oldWater) * WATER_PRICE;
            return (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{user?.fullName}</TableCell>
                <TableCell>{payment.month}</TableCell>
                <TableCell>{payment.year}</TableCell>
                <TableCell>{payment.transactionCode}</TableCell>
                <TableCell>{payment.method == "cash" ? "Tiền mặt" : "Chuyển khoản"}</TableCell>
                <TableCell>{payment.oldElectricity}</TableCell>
                <TableCell>{payment.newElectricity}</TableCell>
                <TableCell>{payment.oldWater}</TableCell>
                <TableCell>{payment.newWater}</TableCell>
                <TableCell>{room.price + fee}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>{payment.status}</TableCell>
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
