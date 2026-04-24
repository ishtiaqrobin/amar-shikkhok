"use client";

import { useEffect, useState, useCallback } from "react";
import { BookingTable } from "@/components/modules/dashboard/admin/BookingTable";
import { adminService } from "@/services/admin.service";
import { useAuth } from "@/hooks/useAuth";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
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
            toast.error("Failed to load bookings", { description: error.message });
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
        <div className="space-y-6 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Booking Management</h1>
                    <p className="text-muted-foreground mt-2">Monitor all tutoring sessions across the platform</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchBookings} disabled={isLoading} className="gap-2 rounded-lg">
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>

            {isLoading ? (
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Student & Tutor</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-6 w-20 rounded" /></TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[140px]" />
                                            <Skeleton className="h-4 w-[120px]" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </TableCell>
                                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <BookingTable bookings={bookings} />
            )}
        </div>
    );
}
