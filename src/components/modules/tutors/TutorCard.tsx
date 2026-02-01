import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import type { TutorListItem } from "@/types/tutor.type";

interface TutorCardProps {
    tutor: TutorListItem;
}

export function TutorCard({ tutor }: TutorCardProps) {
    return (
        <Card className="overflow-hidden group hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-background group-hover:border-primary/20 transition-colors">
                            <AvatarImage src={tutor.user.image || undefined} alt={tutor.user.name} />
                            <AvatarFallback>{tutor.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 right-1/2 translate-x-1/2 flex items-center gap-1 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[10px] font-bold">
                            <Star className="h-3 w-3 fill-current" />
                            {tutor.rating.toFixed(1)}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{tutor.user.name}</h3>
                        <p className="text-sm text-primary font-medium">{tutor.category?.name || "General"}</p>
                        <div className="flex items-center justify-center text-xs text-muted-foreground gap-1 pt-1">
                            <span>{tutor.totalReviews} reviews</span>
                        </div>
                    </div>

                    {tutor.expertise && tutor.expertise.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
                            {tutor.expertise.slice(0, 3).map((exp) => (
                                <Badge key={exp} variant="secondary" className="text-[10px] py-0">
                                    {exp}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {tutor.bio && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                            {tutor.bio}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex items-center justify-between border-t bg-muted/10 mt-4 h-16">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Per hour</span>
                    <span className="text-lg font-bold text-foreground">৳{tutor.hourlyRate}</span>
                </div>
                <Button size="sm" asChild>
                    <Link href={`/tutors/${tutor.id}`}>Profile</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
