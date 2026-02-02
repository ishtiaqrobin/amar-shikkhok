import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  try {
    // Server-side session check
    const { data } = await userService.getSession();

    if (data?.user) {
      isAuthenticated = true;
      userRole = data.user.role || null;
    }
  } catch (error) {
    console.error("Session fetch error in middleware:", error);
  }

  // 1. User is not authenticated - redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Role-based routing logic
  const isAdmin = userRole === Roles.admin;
  const isStudent = userRole === Roles.student;
  const isTutor = userRole === Roles.tutor;

  // ADMIN protection
  if (isAdmin) {
    if (
      pathname.startsWith("/student-dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  // STUDENT protection
  if (isStudent) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/student-dashboard", request.url));
    }
  }

  // TUTOR protection
  if (isTutor) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/student-dashboard")
    ) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Routes to be protected by this middleware
export const config = {
  matcher: [
    "/student-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
};
