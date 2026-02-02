"use client";

import { BookingCard } from "./BookingCard";
import type { Booking } from "@/types/booking.type";

interface BookingListProps {
    bookings: Booking[];
    userRole: "STUDENT" | "TUTOR";
    onCancel?: (bookingId: string) => void;
    onComplete?: (bookingId: string) => void;
}

export function BookingList({ bookings, userRole, onCancel, onComplete }: BookingListProps) {
    if (bookings.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-muted/20 border-primary/5">
                <p className="text-muted-foreground text-lg font-medium">No bookings found in your history.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {bookings.map((booking) => (
                <BookingCard
                    key={booking.id}
                    booking={booking}
                    userRole={userRole}
                    onCancel={onCancel}
                    onComplete={onComplete}
                />
            ))}
        </div>
    );
}
