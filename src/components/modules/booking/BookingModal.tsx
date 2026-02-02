"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CreateBookingInput } from "@/types/booking.type";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    tutorId: string;
    tutorName: string;
    hourlyRate: number;
    onSubmit: (data: CreateBookingInput) => Promise<void>;
}

export function BookingModal({
    isOpen,
    onClose,
    tutorId,
    tutorName,
    hourlyRate,
    onSubmit,
}: BookingModalProps) {
    const [date, setDate] = useState<Date>();
    const [subject, setSubject] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const calculateDuration = () => {
        if (!startTime || !endTime) return 0;
        const [startHour, startMin] = startTime.split(":").map(Number);
        const [endHour, endMin] = endTime.split(":").map(Number);
        const duration = (endHour * 60 + endMin - (startHour * 60 + startMin)) / 60;
        return duration > 0 ? duration : 0;
    };

    const duration = calculateDuration();
    const totalPrice = duration * hourlyRate;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                tutorId,
                subject,
                sessionDate: format(date, "yyyy-MM-dd"),
                startTime,
                endTime,
                notes: notes || undefined,
                totalPrice,
            });

            // Reset form
            setDate(undefined);
            setSubject("");
            setStartTime("");
            setEndTime("");
            setNotes("");
            onClose();
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>বুকিং করুন - {tutorName}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Subject */}
                    <div className="space-y-2">
                        <Label htmlFor="subject">বিষয়</Label>
                        <Input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="যেমন: গণিত, ইংরেজি"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <Label>তারিখ</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : "তারিখ নির্বাচন করুন"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startTime">শুরুর সময়</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTime">শেষ সময়</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Duration & Price */}
                    {duration > 0 && (
                        <div className="p-3 bg-muted rounded-lg space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">সময়কাল:</span>
                                <span className="font-medium">{duration} ঘণ্টা</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">ঘণ্টায় মূল্য:</span>
                                <span className="font-medium">৳{hourlyRate}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold pt-2 border-t">
                                <span>মোট মূল্য:</span>
                                <span className="text-primary">৳{totalPrice}</span>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">নোট (ঐচ্ছিক)</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="বিশেষ কোনো নির্দেশনা..."
                            rows={3}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            বাতিল
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isSubmitting || !date}>
                            {isSubmitting ? "বুকিং হচ্ছে..." : "নিশ্চিত করুন"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
