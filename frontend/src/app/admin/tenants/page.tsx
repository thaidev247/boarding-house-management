import { getTenants } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cookies } from "next/headers";

export default async function TenantsPage() {
  const token = (await cookies()).get("token")?.value;
  const tenants = (await getTenants(token!)) || [];
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Quản lý khách thuê</h2>
        <Button>Thêm khách thuê</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Phòng</TableHead>
            <TableHead>Mã hợp đồng</TableHead>
            <TableHead>Ngày bắt đầu</TableHead>
            <TableHead>Ngày kết thúc</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant: any) => (
            <TableRow key={tenant.id}>
              <TableCell>{tenant.id}</TableCell>
              <TableCell>{tenant.roomId}</TableCell>
              <TableCell>{tenant.contractCode}</TableCell>
              <TableCell>{new Date(tenant.startDate).toLocaleDateString("vi-VN")}</TableCell>
              <TableCell>{tenant.endDate ? new Date(tenant.endDate).toLocaleDateString("vi-VN") : ""}</TableCell>
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
