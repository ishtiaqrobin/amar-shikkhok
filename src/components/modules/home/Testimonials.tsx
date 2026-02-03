import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { reviewService } from "@/services/review.service";
import { Review } from "@/types/tutor.type";

interface ReviewWithTutor extends Review {
    tutor?: {
        user: {
            name: string;
        };
    };
}

interface TestimonialsProps {
    limit?: number;
}

export function Testimonials({ limit = 3 }: TestimonialsProps) {
    const [reviews, setReviews] = useState<ReviewWithTutor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const { data } = await reviewService.getAllReviews(limit);
            if (data) {
                setReviews(data as ReviewWithTutor[]);
            }
            setIsLoading(false);
        };

        fetchReviews();
    }, [limit]);

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Decorative dots */}
            <div className="absolute top-10 left-10 text-primary/10 select-none hidden lg:block">
                <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="h-1.5 w-1.5 rounded-full bg-current" />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Students Experience
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Thousands of students are advancing on their dream path with our platform.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid gap-8 md:grid-cols-3">
                        {[...Array(limit)].map((_, i) => (
                            <Card key={i} className="relative overflow-visible border-none bg-muted/40 shadow-none h-[250px]">
                                <CardContent className="pt-12 pb-8 px-6 flex flex-col h-full">
                                    <div className="absolute -top-6 left-6">
                                        <Skeleton className="h-14 w-14 rounded-full border-4 border-background" />
                                    </div>
                                    <div className="absolute top-4 right-6 opacity-10">
                                        <Quote className="h-8 w-8 fill-current" />
                                    </div>
                                    <div className="space-y-3 grow mt-4">
                                        <Skeleton className="h-4 w-full rounded-md" />
                                        <Skeleton className="h-4 w-[90%] rounded-md" />
                                        <Skeleton className="h-4 w-[95%] rounded-md" />
                                    </div>
                                    <div className="pt-4 mt-auto border-t border-primary/5">
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-24 rounded-md" />
                                            <Skeleton className="h-3 w-40 rounded-md" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <Card key={review.id} className="relative overflow-visible border-none bg-muted/40 shadow-none hover:bg-muted/60 transition-colors h-full">
                                    <CardContent className="pt-12 pb-8 px-6 flex flex-col h-full">
                                        <div className="absolute -top-6 left-6">
                                            <Avatar className="h-14 w-14 border-4 border-background shadow-md">
                                                <AvatarImage src={review.student.image || ""} alt={review.student.name} />
                                                <AvatarFallback>{review.student.name[0]}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="absolute top-4 right-6 text-primary/20">
                                            <Quote className="h-8 w-8 fill-current" />
                                        </div>
                                        <div className="space-y-4 grow">
                                            <p className="text-foreground italic leading-relaxed line-clamp-4">
                                                &quot;{review.comment || "Great experience with the tutor!"}&quot;
                                            </p>
                                        </div>
                                        <div className="pt-4 mt-auto border-t border-primary/5">
                                            <div className="flex flex-col">
                                                <h4 className="font-bold text-foreground line-clamp-1">{review.student.name}</h4>
                                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">
                                                    Studied with {review.tutor?.user?.name || "Tutor"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 text-muted-foreground italic">
                                No reviews available yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
