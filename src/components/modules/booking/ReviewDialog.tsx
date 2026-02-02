"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Loader2 } from "lucide-react";
import { reviewService } from "@/services/review.service";
import { toast } from "sonner";

interface ReviewDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    bookingId: string;
    userToken: string;
    onSuccess?: () => void;
}

export function ReviewDialog({
    isOpen,
    onOpenChange,
    bookingId,
    userToken,
    onSuccess,
}: ReviewDialogProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please provide a rating");
            return;
        }

        setIsLoading(true);
        const { error } = await reviewService.createReview(userToken, {
            bookingId,
            rating,
            comment,
        });

        if (error) {
            toast.error("Error", { description: error.message });
        } else {
            toast.success("Review submitted successfully!");
            onOpenChange(false);
            if (onSuccess) onSuccess();
            // Reset form
            setRating(0);
            setComment("");
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black">Rate Your Session</DialogTitle>
                </DialogHeader>
                <div className="grid gap-8 py-6">
                    <div className="flex flex-col items-center gap-4">
                        <Label className="text-center font-bold uppercase tracking-widest text-muted-foreground text-xs">How was your experience?</Label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-125 active:scale-90"
                                >
                                    <Star
                                        className={`h-10 w-10 transition-colors ${(hoveredRating || rating) >= star
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground/30"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-xs font-medium text-muted-foreground text-center">
                            Tap the stars to rate your tutor&apos;s teaching performance
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="comment" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share Feedback (Optional)</Label>
                        <Textarea
                            id="comment"
                            placeholder="Tell us what you liked or how they can improve..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="resize-none rounded-2xl border-primary/20 focus:border-primary min-h-[120px]"
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter className="flex gap-3">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="rounded-full flex-1 font-bold uppercase tracking-widest text-[10px] h-11">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} className="rounded-full flex-1 font-bold uppercase tracking-widest text-[10px] h-11 shadow-lg shadow-primary/20">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
