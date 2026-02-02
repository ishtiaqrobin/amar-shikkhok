"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import type { Booking } from "@/types/booking.type";

interface UpcomingClassesProps {
    bookings: Booking[];
}

export function UpcomingClasses({ bookings }: UpcomingClassesProps) {
    if (bookings.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>আসন্ন ক্লাস</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <p>কোনো আসন্ন ক্লাস নেই</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>আসন্ন ক্লাস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                    <div
                        key={booking.id}
                        className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <div className="space-y-1">
                            <p className="font-medium">{booking.subject}</p>
                            <p className="text-sm text-muted-foreground">
                                {booking.tutor?.user.name}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{format(new Date(booking.sessionDate), "PPP")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                        {booking.startTime} - {booking.endTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Badge variant="secondary">{booking.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
