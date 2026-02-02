"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import type { Review } from "@/types/tutor.type";

interface ReviewListProps {
    reviews?: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-3xl bg-muted/20 border-primary/5">
                <p className="text-muted-foreground font-medium">No reviews received yet</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
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
                                    {format(new Date(review.createdAt), "dd MMM, yyyy")}
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
