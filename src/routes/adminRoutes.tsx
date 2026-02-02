import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "অ্যাডমিন মেনু",
    items: [
      {
        title: "ড্যাশবোর্ড",
        url: "/dashboard",
      },
      {
        title: "ইউজার ব্যবস্থাপনা",
        url: "/users",
      },
      {
        title: "বুকিং ব্যবস্থাপনা",
        url: "/bookings",
      },
      {
        title: "বিষয় ব্যবস্থাপনা",
        url: "/categories",
      },
    ],
  },
];
