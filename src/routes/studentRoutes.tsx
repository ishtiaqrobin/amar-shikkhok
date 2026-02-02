import { Route } from "@/types";
import { Calendar, LayoutDashboard, User } from "lucide-react";

export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/student-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Bookings",
        url: "/student-dashboard/bookings",
        icon: Calendar,
      },
      {
        title: "Profile",
        url: "/student-dashboard/profile",
        icon: User,
      },
    ],
  },
];
