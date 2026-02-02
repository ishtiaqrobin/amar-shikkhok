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
            <div className="text-center py-12 border rounded-lg bg-muted/50">
                <p className="text-muted-foreground">এখনো কোনো রিভিউ নেই</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {reviews.map((review) => (
                <Card key={review.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                {review.student?.name?.charAt(0) || "U"}
                            </div>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">{review.student?.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {format(new Date(review.createdAt), "dd MMMM, yyyy")}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                                        }`}
                                />
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment || "কোনো মন্তব্য নেই"}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
