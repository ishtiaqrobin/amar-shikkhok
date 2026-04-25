import { Route } from "@/types";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderKanban,
  UserCog,
  TrendingUp,
  Landmark,
  Settings,
} from "lucide-react";

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
        title: "Financials",
        url: "/admin-dashboard/finance",
        icon: TrendingUp,
      },
      {
        title: "Withdrawals",
        url: "/admin-dashboard/withdrawals",
        icon: Landmark,
      },
      {
        title: "Settings",
        url: "/admin-dashboard/settings",
        icon: Settings,
      },
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: UserCog,
      },
    ],
  },
];
