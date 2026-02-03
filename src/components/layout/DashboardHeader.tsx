"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "@/components/modules/authentication/LogoutButton";
import { User, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";


export function DashboardHeader() {
    const { user } = useAuth();

    const getDashboardUrl = () => {
        if (user?.role === "ADMIN") return "/admin-dashboard";
        if (user?.role === "TUTOR") return "/tutor-dashboard";
        return "/student-dashboard";
    };

    const getUserRoutes = () => {
        if (user?.role === "ADMIN") return adminRoutes[0]?.items || [];
        if (user?.role === "TUTOR") return tutorRoutes[0]?.items || [];
        if (user?.role === "STUDENT") return studentRoutes[0]?.items || [];
        return [];
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {/* Mobile Hamburger Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden rounded-full w-9 h-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            <SheetHeader className="px-4 pt-4 pb-1">
                                <SheetTitle>
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
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-muted-foreground px-2">
                                        {user?.role === "ADMIN" && "Admin Menu"}
                                        {user?.role === "TUTOR" && "Tutor Dashboard"}
                                        {user?.role === "STUDENT" && "Student Dashboard"}
                                    </h3>
                                    <nav className="space-y-1">
                                        {getUserRoutes().map((route) => {
                                            const Icon = route.icon;
                                            return (
                                                <Link
                                                    key={route.url}
                                                    href={route.url}
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                                                >
                                                    {Icon && <Icon className="h-4 w-4" />}
                                                    <span>{route.title}</span>
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <h2 className="text-lg font-semibold">
                        {user?.role === "ADMIN" && "Admin Dashboard"}
                        {user?.role === "TUTOR" && "Tutor Dashboard"}
                        {user?.role === "STUDENT" && "Student Dashboard"}
                    </h2>
                </div>

                {/* Profile Menu */}
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
