import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { TutorListItem } from "@/types/tutor.type";
import { formatPrice, getAvatarFallback } from "@/lib/utils";

interface TutorCardProps {
    tutor: TutorListItem;
}

export function TutorCard({ tutor }: TutorCardProps) {
    return (
        <Card className="overflow-hidden group hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl border-primary/10 bg-card/50 backdrop-blur-sm rounded-3xl">
            <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
                        <Avatar className="h-28 w-28 border-4 border-background group-hover:scale-105 transition-all duration-500 relative">
                            <AvatarImage src={tutor.user.image || undefined} alt={tutor.user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                {getAvatarFallback(tutor.user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 right-1/2 translate-x-1/2 flex items-center gap-1.5 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            {tutor.rating.toFixed(1)}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">{tutor.user.name}</h3>
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 rounded-full px-4">
                            {tutor.category?.name || "General"}
                        </Badge>
                        <div className="flex items-center justify-center text-xs text-muted-foreground gap-1.5 pt-2">
                            <MessageSquare className="h-3 w-3" />
                            <span>{tutor.totalReviews} Reviews</span>
                        </div>
                    </div>

                    {tutor.expertise && tutor.expertise.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                            {tutor.expertise.slice(0, 3).map((exp) => (
                                <Badge key={exp} variant="secondary" className="text-[10px] py-0 px-2 rounded-lg bg-muted/50">
                                    {exp}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {tutor.bio && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-2 italic leading-relaxed">
                            &ldquo;{tutor.bio}&rdquo;
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-primary/5 bg-primary/5 mt-2 h-20">
                <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Hourly Fee</span>
                    <span className="text-xl font-black text-primary">{formatPrice(tutor.hourlyRate)}</span>
                </div>
                <Button size="sm" asChild className="rounded-full shadow-lg shadow-primary/20 group-hover:scale-105 transition-all">
                    <Link href={`/tutors/${tutor.id}`} className="flex items-center gap-2">
                        Details <ExternalLink className="h-3 w-3" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
