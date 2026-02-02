import { Route } from "@/types";
import { Calendar, User, Clock, LayoutDashboard } from "lucide-react";

export const tutorRoutes: Route[] = [
    {
        title: "Tutor Dashboard",
        items: [
            {
                title: "Dashboard",
                url: "/tutor-dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Bookings",
                url: "/tutor-dashboard/bookings",
                icon: Calendar,
            },
            {
                title: "Profile",
                url: "/tutor-dashboard/profile",
                icon: User,
            },
            {
                title: "Availability",
                url: "/tutor-dashboard/availability",
                icon: Clock,
            },
        ],
    },
];
