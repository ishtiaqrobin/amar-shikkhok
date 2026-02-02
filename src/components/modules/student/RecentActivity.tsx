"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Booking } from "@/types/booking.type";

interface RecentActivityProps {
    bookings: Booking[];
}

export function RecentActivity({ bookings }: RecentActivityProps) {
    if (bookings.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <p>কোনো সাম্প্রতিক কার্যক্রম নেই</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getActivityIcon = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "CANCELLED":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Calendar className="h-4 w-4 text-blue-500" />;
        }
    };

    const getActivityText = (booking: Booking) => {
        switch (booking.status) {
            case "COMPLETED":
                return `${booking.subject} ক্লাস সম্পন্ন হয়েছে`;
            case "CANCELLED":
                return `${booking.subject} ক্লাস বাতিল করা হয়েছে`;
            case "CONFIRMED":
                return `${booking.subject} ক্লাস নিশ্চিত করা হয়েছে`;
            default:
                return `${booking.subject} এর জন্য বুকিং করা হয়েছে`;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {bookings.slice(0, 10).map((booking) => (
                    <div key={booking.id} className="flex items-start gap-3">
                        <div className="mt-1">{getActivityIcon(booking.status)}</div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{getActivityText(booking)}</p>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={booking.tutor?.user.image || undefined} />
                                    <AvatarFallback className="text-xs">
                                        {booking.tutor?.user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-xs text-muted-foreground">
                                    {booking.tutor?.user.name}
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {format(new Date(booking.updatedAt), "PPP")}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
