import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProfile } from "./app/actions";

export default async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const isAuthPage = path.startsWith("/login");
  const isAdminPage = path.startsWith("/admin");
  const isRootPage = path === "/";

  // 1. Chưa login --> chặn các route cần bảo vệ
  const protectedRoutes = ["/", "/profile", "/admin"];
  const isProtected = protectedRoutes.some((p) => path.startsWith(p));

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Đã login --> chuyển hướng về route phù hợp
  if (token) {
    const user = await getProfile(token);
    if (!user) {
      // Token hết hạn / không hợp lệ --> logout
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Nếu vào trang /login --> đẩy về route đúng role
    if (isAuthPage) {
      if (user?.role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Nếu là admin và vào "/" --> tự chuyển sang /admin
    if (user?.role === "admin" && isRootPage) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Nếu user không phải admin → chặn /admin/*
    if (isAdminPage && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/admin/:path*"],
};
