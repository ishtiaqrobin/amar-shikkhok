import { Route } from "@/types";
import { Calendar, User, Clock, LayoutDashboard, Banknote, Wallet } from "lucide-react";

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
                title: "Earnings",
                url: "/tutor-dashboard/earnings",
                icon: Banknote,
            },
            {
                title: "Withdrawals",
                url: "/tutor-dashboard/withdrawals",
                icon: Wallet,
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
