"use client";

import { useEffect, useState, useCallback } from "react";
import { bookingService } from "@/services/booking.service";
import { BookingList } from "@/components/modules/booking/BookingList";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Booking } from "@/types/booking.type";

export default function TutorBookingsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    const userToken = session?.token || "";

    const fetchBookings = useCallback(async (status?: string) => {
        if (!userToken) return;
        setIsLoading(true);
        try {
            const { data, error } = await bookingService.getMyBookings(userToken, status);

            if (error) {
                toast.error("Error", { description: error.message });
                setBookings([]);
            } else {
                setBookings(data || []);
            }
        } catch (error) {
            console.error("Fetch bookings error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [userToken]);

    useEffect(() => {
        if (!authLoading && userToken) {
            const status = activeTab === "all" ? undefined : activeTab.toUpperCase();
            // Delay fetch to avoid sync state update warnings if necessary
            fetchBookings(status);
        }
    }, [activeTab, userToken, authLoading, fetchBookings]);

    const handleComplete = async (bookingId: string) => {
        if (!userToken) return;

        try {
            const { error } = await bookingService.completeBooking(bookingId, userToken);

            if (error) {
                toast.error("Error", { description: error.message });
            } else {
                toast.success("Success!", { description: "Session completed successfully" });
                fetchBookings(activeTab === "all" ? undefined : activeTab.toUpperCase());
            }
        } catch (error) {
            toast.error("Error", { description: "Failed to complete session" });
        }
    };

    const filterBookings = (status?: string) => {
        if (!status || status === "all") return bookings;
        return bookings.filter((b) => b.status === status.toUpperCase());
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Booking Management</h1>
                <p className="text-muted-foreground mt-2">Manage all your tutoring sessions</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <BookingList
                            bookings={filterBookings(activeTab)}
                            userRole="TUTOR"
                            onComplete={handleComplete}
                        />
                    )}
                </TabsContent>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{bookings.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {bookings.filter((b) => b.status === "CONFIRMED").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {bookings.filter((b) => b.status === "COMPLETED").length}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
