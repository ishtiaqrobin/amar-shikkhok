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
import logo from "@/assets/images/logo.webp";
import Image from "next/image";

export function DashboardSidebar(props: React.ComponentProps<typeof SidebarPrimitive>) {
    const { user } = useAuth();
    let routes: Route[] = [];

    // Determine routes based on user role
    if (user?.role === "ADMIN") {
        routes = adminRoutes
    } else if (user?.role === "TUTOR") {
        routes = tutorRoutes;
    } else if (user?.role === "STUDENT") {
        routes = studentRoutes;
    }

    return (
        <SidebarPrimitive {...props}>
            <SidebarHeader className="border-b">
                <div className="px-4 py-2 font-bold">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={logo}
                            className="max-h-10 dark:invert"
                            alt="Amar Shikkhok"
                            width={32}
                            height={32}
                        />
                        <span className="text-lg font-bold tracking-tighter">
                            Amar <span className="text-primary">Shikkhok</span>
                        </span>
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {routes.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} className="flex items-center gap-2">
                                                    {Icon && <Icon className="h-4 w-4" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
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

