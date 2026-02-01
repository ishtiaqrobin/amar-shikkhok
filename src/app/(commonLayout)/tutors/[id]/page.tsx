import { tutorsService } from "@/services/tutors.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

interface TutorProfilePageProps {
    params: {
        id: string;
    };
}

export default async function TutorProfilePage({ params }: TutorProfilePageProps) {
    const { data: tutor, error } = await tutorsService.getTutorById(params.id, {
        cache: "no-store",
    });

    if (error || !tutor) {
        notFound();
    }

    const { user, bio, expertise, hourlyRate, rating, totalReviews, category, availability, reviews } = tutor;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <Avatar className="h-32 w-32 border-4 border-primary/20">
                                    <AvatarImage src={user.image || undefined} alt={user.name} />
                                    <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                                </Avatar>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold">{user.name}</h1>
                                    <p className="text-primary font-medium">{category?.name || "General Tutor"}</p>

                                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                                        <Star className="h-5 w-5 fill-current" />
                                        <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
                                        <span className="text-sm text-muted-foreground">({totalReviews} reviews)</span>
                                    </div>
                                </div>

                                <div className="w-full pt-4">
                                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                        <span className="text-sm text-muted-foreground">Hourly Rate</span>
                                        <span className="text-2xl font-bold text-primary">৳{hourlyRate}</span>
                                    </div>
                                </div>

                                <Button className="w-full" size="lg" asChild>
                                    <Link href={`/tutors/${tutor.id}/book`}>Book Now</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Contact Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{user.email}</span>
                            </div>
                            {user.phone && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{user.phone}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                {bio || "This tutor hasn't written anything about themselves yet."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Expertise */}
                    {expertise && expertise.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Expertise</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {expertise.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Availability */}
                    {availability && availability.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Schedule</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {availability.map((slot) => (
                                        <div key={slot.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{slot.dayOfWeek}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {slot.startTime} - {slot.endTime}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Reviews */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Reviews ({totalReviews})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {reviews && reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="space-y-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={review.student.image || undefined} />
                                                        <AvatarFallback>{review.student.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{review.student.name}</p>
                                                        <div className="flex items-center gap-1">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-3 w-3 ${i < review.rating
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "text-gray-300"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(review.createdAt).toLocaleDateString("bn-BD")}
                                                </span>
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-muted-foreground pl-13">{review.comment}</p>
                                            )}
                                            <Separator />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    No reviews yet.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
