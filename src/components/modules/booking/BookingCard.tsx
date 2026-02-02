"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Star, FileText } from "lucide-react";
import { format } from "date-fns";
import type { Booking, BookingStatus } from "@/types/booking.type";
import { ReviewDialog } from "./ReviewDialog";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/utils";

interface BookingCardProps {
    booking: Booking;
    userRole: "STUDENT" | "TUTOR";
    onCancel?: (bookingId: string) => void;
    onComplete?: (bookingId: string) => void;
}

const statusColors: Record<BookingStatus, string> = {
    CONFIRMED: "bg-blue-500",
    COMPLETED: "bg-green-500",
    CANCELLED: "bg-red-500",
};

const statusLabels: Record<BookingStatus, string> = {
    CONFIRMED: "CONFIRMED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
};

export function BookingCard({ booking, userRole, onCancel, onComplete }: BookingCardProps) {
    const { session } = useAuth();
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const otherUser = userRole === "STUDENT" ? booking.tutor?.user : booking.student;
    const canCancel = userRole === "STUDENT" && booking.status === "CONFIRMED";
    const canComplete = userRole === "TUTOR" && booking.status === "CONFIRMED";
    const canReview = userRole === "STUDENT" && booking.status === "COMPLETED" && !booking.review;

    return (
        <>
            <Card className="hover:shadow-md transition-all rounded-3xl border-primary/5 bg-background overflow-hidden border">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border border-primary/10">
                                <AvatarImage src={otherUser?.image || undefined} />
                                <AvatarFallback className="font-bold">{otherUser?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-xl font-black">{booking.subject}</CardTitle>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                                    {userRole === "STUDENT" ? "Tutor" : "Student"}: {otherUser?.name}
                                </p>
                            </div>
                        </div>
                        <Badge className={`${statusColors[booking.status]} rounded-full px-4 text-[10px] font-black tracking-widest uppercase`}>
                            {statusLabels[booking.status]}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider p-3 bg-muted/30 rounded-2xl">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary/60" />
                            <span>{format(new Date(booking.sessionDate), "dd MMM, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary/60" />
                            <span>
                                {booking.startTime} - {booking.endTime}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Payment Amount</span>
                        <span className="text-xl font-black text-primary">{formatPrice(booking.totalPrice)}</span>
                    </div>

                    {booking.notes && (
                        <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-2xl">
                            <FileText className="h-4 w-4 text-primary/40 mt-0.5" />
                            <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">&quot;{booking.notes}&quot;</p>
                        </div>
                    )}

                    {booking.review && (
                        <div className="pt-4 border-t border-primary/5">
                            <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`h-3 w-3 ${i < booking.review!.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
                                ))}
                            </div>
                            <p className="text-xs italic text-muted-foreground bg-muted/20 p-2 rounded-xl">&quot;{booking.review.comment}&quot;</p>
                        </div>
                    )}

                    {(canCancel || canComplete || canReview) && (
                        <div className="flex gap-3 pt-4 border-t border-primary/5">
                            {canCancel && onCancel && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onCancel(booking.id)}
                                    className="flex-1 rounded-full font-bold uppercase tracking-widest text-[10px] h-10"
                                >
                                    Cancel Session
                                </Button>
                            )}
                            {canComplete && onComplete && (
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => onComplete(booking.id)}
                                    className="flex-1 rounded-full font-bold uppercase tracking-widest text-[10px] h-10 shadow-lg shadow-primary/20"
                                >
                                    Mark Completed
                                </Button>
                            )}
                            {canReview && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsReviewOpen(true)}
                                    className="flex-1 gap-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 rounded-full font-bold uppercase tracking-widest text-[10px] h-10"
                                >
                                    <Star className="h-4 w-4" /> Write Review
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            <ReviewDialog
                isOpen={isReviewOpen}
                onOpenChange={setIsReviewOpen}
                bookingId={booking.id}
                userToken={session?.token || ""}
                onSuccess={() => onComplete?.(booking.id)} // Refresh list on success
            />
        </>
    );
}
