"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import type { Review } from "@/types/tutor.type";
import { useEffect, useState } from "react";
import { reviewService } from "@/services/review.service";
import { Skeleton } from "@/components/ui/skeleton";

interface ReviewListProps {
    reviews?: Review[];
    tutorId?: string;
}

export function ReviewList({ reviews: initialReviews, tutorId }: ReviewListProps) {
    const [reviews, setReviews] = useState<Review[] | undefined>(initialReviews);
    const [isLoading, setIsLoading] = useState(!initialReviews && !!tutorId);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!tutorId || initialReviews) return;

            setIsLoading(true);
            const { data } = await reviewService.getTutorReviews(tutorId);

            if (data) {
                setReviews(data);
            }
            setIsLoading(false);
        };

        fetchReviews();
    }, [tutorId, initialReviews]);

    if (isLoading) {
        return (
            <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-primary/5 shadow-sm rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="grid gap-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-20" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-3xl bg-muted/20 border-primary/5">
                <p className="text-muted-foreground font-medium">No reviews received yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-6">
            {reviews.map((review) => (
                <Card key={review.id} className="border-primary/5 shadow-sm rounded-2xl hover:bg-muted/30 transition-all group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary border border-primary/20">
                                {review.student?.name?.charAt(0) || "U"}
                            </div>
                            <div className="grid gap-1">
                                <p className="text-sm font-bold leading-none group-hover:text-primary transition-colors">{review.student?.name}</p>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                    {review.createdAt ? format(new Date(review.createdAt), "dd MMM, yyyy") : "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3.5 w-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                                        }`}
                                />
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                            &quot;{review.comment || "No comment provided"}&quot;
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
