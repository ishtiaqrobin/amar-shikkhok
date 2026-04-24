"use client";

import { useEffect, useState } from "react";
import { TutorStats } from "@/components/modules/dashboard/tutor/TutorStats";
import { tutorsService } from "@/services/tutors.service";
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";
import type { TutorStats as TutorStatsType } from "@/types/tutor.type";
import type { Booking } from "@/types/booking.type";
import { BookingList } from "@/components/modules/booking/BookingList";
import { useAuth } from "@/hooks/useAuth";

export default function TutorDashboardPage() {
  const { session } = useAuth();
  const [stats, setStats] = useState<TutorStatsType | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sessionToken = session?.token || "";

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionToken) {
        if (isLoading) return;
        setIsLoading(false);
        return;
      }

      try {
        const [statsRes, bookingsRes] = await Promise.all([
          tutorsService.getStats(sessionToken),
          bookingService.getMyBookings(sessionToken),
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
        toast.error("Error", { description: "Failed to load dashboard data" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sessionToken, isLoading]);


  return (
    <div className="space-y-6 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
        <p className="text-muted-foreground mt-2">Summary of your tutoring activities and progress</p>
      </div>

      <TutorStats stats={stats} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Bookings</h2>
        {recentBookings.length > 0 ? (
          <BookingList bookings={recentBookings} userRole="TUTOR" />
        ) : (
          <div className="text-center py-12 border rounded-2xl bg-muted/30 border-primary/5">
            <p className="text-muted-foreground">No recent bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}
