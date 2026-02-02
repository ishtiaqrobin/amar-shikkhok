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
import { useAuth } from "@/hooks/useAuth";

export default function StudentDashboardPage() {
  const { session } = useAuth();
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.token) {
        // If token is not yet available, wait
        if (isLoading) return;
        setIsLoading(false);
        return;
      }

      try {
        const [statsRes, bookingsRes] = await Promise.all([
          studentService.getStats(session?.token),
          bookingService.getMyBookings(session?.token)
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
        toast.error("Error", { description: "Failed to load dashboard data" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session?.token, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">Personal learning activity overview and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          description="Total sessions requested"
          icon={BookOpen}
        />
        <StatsCard
          title="Upcoming Classes"
          value={stats?.upcomingClasses || 0}
          description="Scheduled for this week"
          icon={Calendar}
        />
        <StatsCard
          title="Completed Classes"
          value={stats?.completedClasses || 0}
          description="Total sessions attended"
          icon={CheckCircle}
        />
        <StatsCard
          title="Total Hours"
          value={stats?.totalHours || 0}
          description="Total learning time"
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
