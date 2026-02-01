"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: string[];
    redirectTo?: string;
}

export function RoleGuard({
    children,
    allowedRoles,
    redirectTo = "/"
}: RoleGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/login");
                return;
            }

            if (user?.role && !allowedRoles.includes(user.role)) {
                router.push(redirectTo);
            }
        }
    }, [user, isAuthenticated, isLoading, allowedRoles, router, redirectTo]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated || (user?.role && !allowedRoles.includes(user.role))) {
        return null;
    }

    return <>{children}</>;
}
