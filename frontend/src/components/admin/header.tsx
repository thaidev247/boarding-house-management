import { getProfile, logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import { cookies } from "next/headers";

export default async function Header() {
  const token = (await cookies()).get("token")?.value;
  const profile = (await getProfile(token!)) || [];
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <div className="flex items-center gap-3">
        <Button variant="outline">
          <UserCircle className="mr-2 h-4 w-4" />
          {profile.fullName}
        </Button>
        <Button variant="destructive" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
