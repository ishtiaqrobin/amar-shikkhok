import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  try {
    const { data } = await userService.getSession();

    if (data?.user) {
      isAuthenticated = true;
      userRole = data.user.role || null;
    }
  } catch (error) {
    console.error("Session fetch error:", error);
  }

  //* User is not authenticated - redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* Role-based routing logic
  const isAdmin = userRole === Roles.admin;
  const isStudent = userRole === Roles.student;
  const isTutor = userRole === Roles.tutor;
  
  // ADMIN users
  if (isAdmin) {
    // Admin trying to access student or tutor dashboard -> redirect to admin dashboard
    if (
      pathname.startsWith("/student-dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  // STUDENT users
  if (isStudent) {
    // Student trying to access admin or tutor dashboard -> redirect to student dashboard
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/student-dashboard", request.url));
    }
  }

  // TUTOR users
  if (isTutor) {
    // Tutor trying to access admin or student dashboard -> redirect to tutor dashboard
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/student-dashboard")
    ) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  // Allow access if role matches the dashboard
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student-dashboard",
    "/student-dashboard/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
