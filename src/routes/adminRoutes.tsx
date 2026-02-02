import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Menu",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
      },
      {
        title: "User Management",
        url: "/admin-dashboard/users",
      },
      {
        title: "Booking Management",
        url: "/admin-dashboard/bookings",
      },
      {
        title: "Category Management",
        url: "/admin-dashboard/categories",
      },
    ],
  },
];
