"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, User, Building2, CreditCard, DoorOpen } from "lucide-react";

const menu = [
  { name: "Tổng quan", href: "/admin", icon: Home },
  { name: "Người dùng", href: "/admin/users", icon: User },
  { name: "Khách thuê", href: "/admin/tenants", icon: Building2 },
  { name: "Phòng", href: "/admin/rooms", icon: DoorOpen },
  { name: "Thanh toán", href: "/admin/payments", icon: CreditCard },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 p-4 flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700",
            path === item.href && "bg-gray-700"
          )}
        >
          <item.icon size={18} />
          {item.name}
        </Link>
      ))}
    </aside>
  );
}
