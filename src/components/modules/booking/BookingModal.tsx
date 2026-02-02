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
import { cn, formatPrice } from "@/lib/utils";
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
            <DialogContent className="sm:max-w-[500px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black">Book a Session - {tutorName}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    {/* Subject */}
                    <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subject</Label>
                        <Input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g. Mathematics, Physics..."
                            required
                            className="h-12 rounded-xl border-primary/20 focus:border-primary"
                        />
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Select Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full h-12 justify-start text-left font-medium rounded-xl border-primary/20 hover:border-primary transition-all",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : "Choose a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-2xl border-primary/20 shadow-xl" align="start">
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
                            <Label htmlFor="startTime" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Start Time</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="pl-10 h-10 rounded-xl border-primary/20"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTime" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">End Time</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="pl-10 h-10 rounded-xl border-primary/20"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Duration & Price */}
                    {duration > 0 && (
                        <div className="p-4 bg-primary/5 rounded-2xl space-y-2 border border-primary/10">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <span>Duration</span>
                                <span>{duration} Hours</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <span>Hourly Rate</span>
                                <span>{formatPrice(hourlyRate)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-black pt-2 border-t border-primary/10 text-primary">
                                <span>Total Payment</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Instructions (Optional)</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any specific topics or notes for the tutor..."
                            rows={3}
                            className="rounded-xl resize-none border-primary/20"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 rounded-full font-bold uppercase tracking-widest"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 h-12 rounded-full font-bold uppercase tracking-widest shadow-lg shadow-primary/20" disabled={isSubmitting || !date}>
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
