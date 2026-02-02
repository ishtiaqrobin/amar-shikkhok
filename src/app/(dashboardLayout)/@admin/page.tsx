"use client";

import { useEffect, useState, useCallback } from "react";
import { AdminStats } from "@/components/modules/dashboard/admin/AdminStats";
import { adminService } from "@/services/admin.service";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { AdminStats as AdminStatsType } from "@/types/admin.type";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [stats, setStats] = useState<AdminStatsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userToken = session?.token || "";

    const fetchStats = useCallback(async () => {
        if (!userToken) return;
        setIsLoading(true);
        const { data, error } = await adminService.getStats(userToken);

        if (error) {
            toast.error("স্ট্যাটাস লোড করতে সমস্যা হয়েছে", { description: error.message });
        } else {
            setStats(data);
        }
        setIsLoading(false);
    }, [userToken]);

    useEffect(() => {
        if (!authLoading && userToken) {
            Promise.resolve().then(() => fetchStats());
        }
    }, [authLoading, userToken, fetchStats]);

    if (isLoading && !stats) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">অ্যাডমিন ড্যাশবোর্ড</h1>
                    <p className="text-muted-foreground mt-2 text-lg">প্ল্যাটফর্মের একটি সামগ্রিক চিত্র</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchStats} disabled={isLoading} className="gap-2">
                    <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    রিফ্রেশ করুন
                </Button>
            </div>

            <AdminStats stats={stats} />

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Activity or Chart could go here */}
            </div>
        </div>
    );
}
