"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, CheckCircle, Clock, Loader2 } from "lucide-react";
import { StatsCard } from "@/components/modules/student/StatsCard";
import { UpcomingClasses } from "@/components/modules/student/UpcomingClasses";
import { RecentActivity } from "@/components/modules/student/RecentActivity";
import { studentService, type StudentStats } from "@/services/student.service";
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";
import type { Booking } from "@/types/booking.type";

export default function StudentDashboardPage() {
    const [stats, setStats] = useState<StudentStats | null>(null);
    const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
    const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // TODO: Get token from session
    const userToken = ""; // Replace with actual token

    useEffect(() => {
        const fetchData = async () => {
            if (!userToken) {
                setIsLoading(false);
                return;
            }

            try {
                const [statsRes, bookingsRes] = await Promise.all([
                    studentService.getStats(userToken),
                    bookingService.getMyBookings(userToken)
                ]);

                if (statsRes.error) {
                    toast.error("Stats Error", { description: statsRes.error.message });
                } else {
                    setStats(statsRes.data);
                }

                if (bookingsRes.error) {
                    toast.error("Bookings Error", { description: bookingsRes.error.message });
                } else {
                    const allBookings = bookingsRes.data || [];

                    // Filter upcoming (Confirmed in future)
                    const now = new Date();
                    const upcoming = allBookings.filter(b =>
                        b.status === "CONFIRMED" &&
                        new Date(b.sessionDate) >= now
                    );
                    setUpcomingBookings(upcoming);
                    setRecentBookings(allBookings.slice(0, 10));
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error);
                toast.error("ত্রুটি", { description: "ড্যাশবোর্ড তথ্য লোড করতে ব্যর্থ হয়েছে" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userToken]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">ড্যাশবোর্ড</h1>
                <p className="text-muted-foreground mt-2">আপনার শিক্ষা কার্যক্রমের সারসংক্ষেপ</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="মোট বুকিং"
                    value={stats?.totalBookings || 0}
                    description="সর্বমোট বুকিং সংখ্যা"
                    icon={BookOpen}
                />
                <StatsCard
                    title="আসন্ন ক্লাস"
                    value={stats?.upcomingClasses || 0}
                    description="আগামী সপ্তাহে"
                    icon={Calendar}
                />
                <StatsCard
                    title="সম্পন্ন ক্লাস"
                    value={stats?.completedClasses || 0}
                    description="এ পর্যন্ত সম্পন্ন"
                    icon={CheckCircle}
                />
                <StatsCard
                    title="মোট ঘণ্টা"
                    value={stats?.totalHours || 0}
                    description="শিক্ষা গ্রহণ করা হয়েছে"
                    icon={Clock}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upcoming Classes Widget */}
                <UpcomingClasses bookings={upcomingBookings} />

                {/* Recent Activity Feed */}
                <RecentActivity bookings={recentBookings} />
            </div>
        </div>
    );
}
