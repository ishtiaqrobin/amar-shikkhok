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
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">কোনো বুকিং পাওয়া যায়নি।</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
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
