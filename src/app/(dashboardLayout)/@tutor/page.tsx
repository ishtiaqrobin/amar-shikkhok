"use client";

import { useEffect, useState } from "react";
import { TutorStats } from "@/components/modules/dashboard/tutor/TutorStats";
import { tutorsService } from "@/services/tutors.service";
import { bookingService } from "@/services/booking.service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { TutorStats as TutorStatsType } from "@/types/tutor.type";
import type { Booking } from "@/types/booking.type";
import { BookingList } from "@/components/modules/booking/BookingList";

export default function TutorDashboardPage() {
    const [stats, setStats] = useState<TutorStatsType | null>(null);
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
                    tutorsService.getStats(userToken),
                    bookingService.getMyBookings(userToken),
                ]);

                if (statsRes.error) {
                    toast.error("Stats Error", { description: statsRes.error.message });
                } else {
                    setStats(statsRes.data);
                }

                if (bookingsRes.error) {
                    toast.error("Bookings Error", { description: bookingsRes.error.message });
                } else {
                    setRecentBookings(bookingsRes.data?.slice(0, 5) || []);
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
                <h1 className="text-3xl font-bold">শিক্ষক ড্যাশবোর্ড</h1>
                <p className="text-muted-foreground mt-2">আপনার টিউটোরিং কার্যক্রমের সারসংক্ষেপ</p>
            </div>

            <TutorStats stats={stats} />

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">সাম্প্রতিক বুকিং</h2>
                {recentBookings.length > 0 ? (
                    <BookingList bookings={recentBookings} userRole="TUTOR" />
                ) : (
                    <div className="text-center py-12 border rounded-lg bg-muted/50">
                        <p className="text-muted-foreground">কোনো সাম্প্রতিক বুকিং নেই</p>
                    </div>
                )}
            </div>
        </div>
    );
}
