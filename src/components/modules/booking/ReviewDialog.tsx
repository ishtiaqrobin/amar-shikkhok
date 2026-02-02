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
            toast.error("রটিং প্রদান করুন");
            return;
        }

        setIsLoading(true);
        const { error } = await reviewService.createReview(userToken, {
            bookingId,
            rating,
            comment,
        });

        if (error) {
            toast.error("ত্রুটি", { description: error.message });
        } else {
            toast.success("রিভিউ প্রদান করা হয়েছে!");
            onOpenChange(false);
            if (onSuccess) onSuccess();
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>সেশন রিভিউ দিন</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="flex flex-col items-center gap-3">
                        <Label className="text-center font-medium">আপনার কি মনে হয়?</Label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-8 w-8 ${(hoveredRating || rating) >= star
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted-foreground"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-balance text-muted-foreground text-center">
                            স্টার রেটিং দিন যা টিউটরের দক্ষতা নির্দেশ করে
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comment">মন্তব্য (ঐচ্ছিক)</Label>
                        <Textarea
                            id="comment"
                            placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="resize-none"
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        বাতিল
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        রিভিউ সাবমিট করুন
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
