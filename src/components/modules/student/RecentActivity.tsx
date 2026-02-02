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
            <Card className="border-primary/10 shadow-sm rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/20">
                        <p>No recent activity found</p>
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
                return `${booking.subject} class completed`;
            case "CANCELLED":
                return `${booking.subject} class canceled`;
            case "CONFIRMED":
                return `${booking.subject} class confirmed`;
            default:
                return `Booking made for ${booking.subject}`;
        }
    };

    return (
        <Card className="border-primary/10 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {bookings.slice(0, 10).map((booking) => (
                    <div key={booking.id} className="flex items-start gap-4 group transition-all">
                        <div className="mt-1 p-2 rounded-full bg-muted/50 group-hover:bg-primary/5 transition-colors">
                            {getActivityIcon(booking.status)}
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-sm font-bold leading-tight decoration-primary/30 group-hover:decoration-primary">{getActivityText(booking)}</p>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 border border-primary/10">
                                    <AvatarImage src={booking.tutor?.user.image || undefined} />
                                    <AvatarFallback className="text-[10px] font-bold">
                                        {booking.tutor?.user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {booking.tutor?.user.name}
                                </p>
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold whitespace-nowrap pt-1">
                            {format(new Date(booking.updatedAt), "dd MMM")}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
