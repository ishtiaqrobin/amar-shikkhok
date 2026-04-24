"use client";

import { useEffect, useState, useCallback } from "react";
import { bookingService } from "@/services/booking.service";
import { BookingList } from "@/components/modules/booking/BookingList";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, BookOpen, Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import type { Booking } from "@/types/booking.type";

export default function StudentBookingsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    const userToken = session?.token || "";

    const fetchBookings = useCallback(async (status?: string) => {
        if (!userToken) return;
        setIsLoading(true);
        const { data, error } = await bookingService.getMyBookings(userToken, status);

        if (error) {
            toast.error("Error", { description: error.message });
            setBookings([]);
        } else {
            setBookings(data || []);
        }
        setIsLoading(false);
    }, [userToken]);

    useEffect(() => {
        if (!authLoading && userToken) {
            const status = activeTab === "all" ? undefined : activeTab.toUpperCase();
            Promise.resolve().then(() => fetchBookings(status));
        }
    }, [activeTab, userToken, authLoading, fetchBookings]);

    const handleCancel = async (bookingId: string) => {
        if (!userToken) return;

        const { error } = await bookingService.cancelBooking(bookingId, userToken);

        if (error) {
            toast.error("Error", { description: error.message });
        } else {
            toast.success("Success!", { description: "Booking cancelled successfully" });
            fetchBookings(activeTab === "all" ? undefined : activeTab.toUpperCase());
        }
    };

    const filterBookings = (status?: string) => {
        if (!status || status === "all") return bookings;
        return bookings.filter((b) => b.status === status.toUpperCase());
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">My Bookings</h1>
                <p className="text-muted-foreground mt-2">View and manage all your bookings</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    {isLoading && bookings.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <BookingList
                            bookings={filterBookings(activeTab)}
                            userRole="STUDENT"
                            onCancel={handleCancel}
                            onComplete={() => fetchBookings(activeTab === "all" ? undefined : activeTab.toUpperCase())}
                        />
                    )}
                </TabsContent>
            </Tabs>

            {/* Sub Card For Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{bookings.length}</div>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {bookings.filter((b) => b.status === "CONFIRMED").length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                        <div className="bg-emerald-100 p-2 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
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
