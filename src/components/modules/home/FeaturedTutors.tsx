import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { tutorsService } from "@/services/tutors.service";
import { TutorListItem } from "@/types/tutor.type";

export function FeaturedTutors() {
    const [tutors, setTutors] = useState<TutorListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopTutors = async () => {
            const { data } = await tutorsService.getTutors({
                limit: 20,
                minRating: 4,
            });

            if (data?.data) {
                // Sort by rating descending and take top 4
                const sorted = [...data.data]
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 4);
                setTutors(sorted);
            }
            setIsLoading(false);
        };

        fetchTopTutors();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 bg-muted/20">
                <div className="container mx-auto px-4 text-center">
                    <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
                    <p className="mt-4 text-muted-foreground font-medium">Loading top tutors...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Find the Best Tutors
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Our platform&apos;s best-rated experienced teachers.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="hidden md:flex rounded-full">
                        <Link href="/tutors">See All Tutors</Link>
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {tutors.map((tutor) => (
                        <Card key={tutor.id} className="overflow-hidden group hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg rounded-3xl border-primary/5 bg-background h-full flex flex-col">
                            <CardContent className="p-6 flex-grow">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 border-4 border-background group-hover:border-primary/20 transition-all shadow-md">
                                            <AvatarImage src={tutor.user.image || ""} alt={tutor.user.name} />
                                            <AvatarFallback>{tutor.user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-2 right-1/2 translate-x-1/2 flex items-center gap-1 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                                            <Star className="h-3 w-3 fill-current" />
                                            {tutor.rating.toFixed(1)}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{tutor.user.name}</h3>
                                        <p className="text-sm text-primary font-medium line-clamp-1">{tutor.category?.name || "Expert Tutor"}</p>
                                        <div className="flex items-center justify-center text-xs text-muted-foreground gap-1 pt-1 opacity-70">
                                            <MapPin className="h-3 w-3" />
                                            Verified Tutor
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
                                        {tutor.expertise.slice(0, 3).map((exp) => (
                                            <Badge key={exp} variant="secondary" className="text-[10px] py-0 rounded-full bg-primary/5 text-primary">
                                                {exp}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-4 flex items-center justify-between border-t border-primary/5 bg-muted/10 mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted-foreground uppercase font-black">Per Hour</span>
                                    <span className="text-xl font-black text-primary">{formatPrice(tutor.hourlyRate)}</span>
                                </div>
                                <Button size="sm" asChild className="rounded-full shadow-md shadow-primary/20">
                                    <Link href={`/tutors/${tutor.id}`}>Profile</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Button asChild variant="outline" className="w-full rounded-full">
                        <Link href="/tutors">See All Tutors</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
