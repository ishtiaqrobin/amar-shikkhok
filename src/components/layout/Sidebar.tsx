"use client";

import * as React from "react";
import {
    Sidebar as SidebarPrimitive,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { Route } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { LogoutButton } from "@/components/modules/authentication/LogoutButton";
import { Home, BookOpen, Users, Settings, LayoutDashboard } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    Dashboard: <LayoutDashboard className="h-4 w-4" />,
    Home: <Home className="h-4 w-4" />,
    Tutors: <Users className="h-4 w-4" />,
    Bookings: <BookOpen className="h-4 w-4" />,
    Settings: <Settings className="h-4 w-4" />,
};

export function DashboardSidebar(props: React.ComponentProps<typeof SidebarPrimitive>) {
    const { user } = useAuth();
    let routes: Route[] = [];

    // Determine routes based on user role
    if (user?.role === "ADMIN") {
        routes = adminRoutes;
    } else if (user?.role === "TUTOR") {
        routes = tutorRoutes;
    } else if (user?.role === "STUDENT") {
        routes = studentRoutes;
    }

    return (
        <SidebarPrimitive {...props}>
            <SidebarHeader className="border-b">
                <div className="p-4 font-bold">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl">📚</span>
                        <span>AmarShikkhok</span>
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {routes.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className="flex items-center gap-2">
                                                {iconMap[item.title] || <LayoutDashboard className="h-4 w-4" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <LogoutButton variant="outline" className="w-full" />
            </SidebarFooter>

            <SidebarRail />
        </SidebarPrimitive>
    );
}

