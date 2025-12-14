import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRooms, getTenants, getUsers } from "../actions";
import { cookies } from "next/headers";

export default async function AdminDashboard() {
  const token = (await cookies()).get("token")?.value;
  const users = await getUsers(token!);
  const tenants = await getTenants(token!);
  const rooms = await getRooms(token!);

  const numberOfAdmin = users.filter((u: any) => u.role == "admin").length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tổng số người dùng</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {users?.length} <span className="text-2xl text-gray-600 font-normal">({numberOfAdmin} admin)</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tổng số khách thuê</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">{tenants?.length}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tổng số phòng</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">{rooms?.length}</CardContent>
      </Card>
    </div>
  );
}
