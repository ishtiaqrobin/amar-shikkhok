"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/modules/authentication/LogoutButton";
import { User, Settings } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
    const { user } = useAuth();

    const getDashboardUrl = () => {
        if (user?.role === "ADMIN") return "/admin-dashboard";
        if (user?.role === "TUTOR") return "/tutor-dashboard";
        return "/student-dashboard";
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold">
                        {user?.role === "ADMIN" && "Admin Dashboard"}
                        {user?.role === "TUTOR" && "Tutor Dashboard"}
                        {user?.role === "STUDENT" && "Student Dashboard"}
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user?.image || undefined} alt={user?.name} />
                                    <AvatarFallback>
                                        {user?.name?.charAt(0).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground mt-1">
                                        Role: {user?.role}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={getDashboardUrl()} className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <LogoutButton variant="ghost" className="w-full justify-start px-2" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
