"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, User, FileText, DollarSign } from "lucide-react";
import { format } from "date-fns";
import type { Booking, BookingStatus } from "@/types/booking.type";

interface BookingCardProps {
    booking: Booking;
    userRole: "STUDENT" | "TUTOR";
    onCancel?: (bookingId: string) => void;
    onComplete?: (bookingId: string) => void;
}

const statusColors: Record<BookingStatus, string> = {
    PENDING: "bg-yellow-500",
    CONFIRMED: "bg-blue-500",
    COMPLETED: "bg-green-500",
    CANCELLED: "bg-red-500",
};

const statusLabels: Record<BookingStatus, string> = {
    PENDING: "অপেক্ষমাণ",
    CONFIRMED: "নিশ্চিত",
    COMPLETED: "সম্পন্ন",
    CANCELLED: "বাতিল",
};

export function BookingCard({ booking, userRole, onCancel, onComplete }: BookingCardProps) {
    const otherUser = userRole === "STUDENT" ? booking.tutor?.user : booking.student;
    const canCancel = userRole === "STUDENT" && booking.status === "PENDING";
    const canComplete = userRole === "TUTOR" && booking.status === "CONFIRMED";

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={otherUser?.image || undefined} />
                            <AvatarFallback>{otherUser?.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{booking.subject}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {userRole === "STUDENT" ? "শিক্ষক" : "শিক্ষার্থী"}: {otherUser?.name}
                            </p>
                        </div>
                    </div>
                    <Badge className={statusColors[booking.status]}>
                        {statusLabels[booking.status]}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(booking.sessionDate), "PPP")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                            {booking.startTime} - {booking.endTime}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-primary">৳{booking.totalPrice}</span>
                </div>

                {booking.notes && (
                    <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-muted-foreground">{booking.notes}</p>
                    </div>
                )}

                {(canCancel || canComplete) && (
                    <div className="flex gap-2 pt-3 border-t">
                        {canCancel && onCancel && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onCancel(booking.id)}
                                className="flex-1"
                            >
                                বাতিল করুন
                            </Button>
                        )}
                        {canComplete && onComplete && (
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => onComplete(booking.id)}
                                className="flex-1"
                            >
                                সম্পন্ন করুন
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
