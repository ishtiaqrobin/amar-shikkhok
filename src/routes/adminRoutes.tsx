import { Route } from "@/types";
import { LayoutDashboard, Users, Calendar, FolderKanban, UserCog } from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Menu",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "User Management",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "Booking Management",
        url: "/admin-dashboard/bookings",
        icon: Calendar,
      },
      {
        title: "Category Management",
        url: "/admin-dashboard/categories",
        icon: FolderKanban,
      },
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: UserCog,
      },
    ],
  },
];
