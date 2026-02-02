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
            <Card className="border-primary/10 shadow-sm rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-lg">Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/20">
                        <p>No upcoming classes found</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-primary/10 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader>
                <CardTitle className="text-lg">Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                    <div
                        key={booking.id}
                        className="flex items-start justify-between p-4 border border-primary/5 rounded-2xl hover:bg-muted/30 transition-all group"
                    >
                        <div className="space-y-2">
                            <p className="font-bold group-hover:text-primary transition-colors">{booking.subject}</p>
                            <p className="text-sm text-muted-foreground font-medium">
                                Tutor: {booking.tutor?.user.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-primary/60" />
                                    <span>{format(new Date(booking.sessionDate), "PPP")}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-primary/60" />
                                    <span>
                                        {booking.startTime} - {booking.endTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Badge variant="secondary" className="rounded-full bg-primary/5 text-primary border-primary/10 px-3">{booking.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
