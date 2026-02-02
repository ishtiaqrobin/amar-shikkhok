"use client";

import { useEffect, useState, useCallback } from "react";
import { BookingTable } from "@/components/modules/dashboard/admin/BookingTable";
import { adminService } from "@/services/admin.service";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AdminBooking } from "@/types/admin.type";
import { Button } from "@/components/ui/button";

export default function AdminBookingsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const userToken = session?.token || "";

    const fetchBookings = useCallback(async () => {
        if (!userToken) return;
        setIsLoading(true);
        const { data, error } = await adminService.getAllBookings(userToken);

        if (error) {
            toast.error("বুকিং লিস্ট লোড করতে সমস্যা হয়েছে", { description: error.message });
            setBookings([]);
        } else {
            setBookings(data || []);
        }
        setIsLoading(false);
    }, [userToken]);

    useEffect(() => {
        if (!authLoading && userToken) {
            Promise.resolve().then(() => fetchBookings());
        }
    }, [authLoading, userToken, fetchBookings]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">বুকিং ব্যবস্থাপনা</h1>
                    <p className="text-muted-foreground mt-2">প্ল্যাটফর্মের সকল টিউটোরিং সেশন দেখুন</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchBookings} disabled={isLoading} className="gap-2">
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    রিফ্রেশ করুন
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <BookingTable bookings={bookings} />
            )}
        </div>
    );
}
