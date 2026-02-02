"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Mail, Phone } from "lucide-react";
import { BookingModal } from "@/components/modules/booking/BookingModal";
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";
import { reviewService } from "@/services/review.service";
import type { Tutor, Review } from "@/types/tutor.type";
import type { CreateBookingInput } from "@/types/booking.type";
import { formatPrice } from "@/lib/utils";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface TutorProfileClientProps {
    tutor: Tutor;
}

export function TutorProfileClient({ tutor }: TutorProfileClientProps) {
    const { user: authUser, session: authSession, isLoading: authLoading } = useAuth();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>(tutor.reviews || []);
    const [isReviewsLoading, setIsReviewsLoading] = useState(!tutor.reviews);
    const router = useRouter();

    const { user, bio, expertise, hourlyRate, rating, totalReviews, category, availability } = tutor;

    const handleBookClick = () => {
        if (!authLoading && !authUser) {
            toast.info("Login Required", {
                description: "Please login as a student to book a session",
            });
            router.push("/login?redirect=" + encodeURIComponent(window.location.pathname));
            return;
        }

        if (authUser && authUser.role !== "STUDENT") {
            toast.error("Access Denied", {
                description: "Only students can book tutoring sessions",
            });
            return;
        }

        setIsBookingModalOpen(true);
    };

    const handleBooking = async (data: CreateBookingInput) => {
        const token = authSession?.token;
        if (!token) {
            toast.error("Login Required", {
                description: "Please login to book a session",
            });
            router.push("/login");
            return;
        }

        const { error } = await bookingService.createBooking(data, token);

        if (error) {
            toast.error("Error", {
                description: error.message,
            });
        } else {
            toast.success("Success!", {
                description: "Session booked successfully",
            });
            setIsBookingModalOpen(false);
            router.push("/student-dashboard/bookings");
        }
    };

    useEffect(() => {
        if (!tutor.reviews) {
            const fetchReviews = async () => {
                const { data } = await reviewService.getTutorReviews(tutor.id);
                if (data) {
                    setReviews(data);
                }
                setIsReviewsLoading(false);
            };
            fetchReviews();
        }
    }, [tutor.id, tutor.reviews]);

    return (
        <>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="rounded-3xl border-primary/5 shadow-sm overflow-hidden border">
                            <CardContent className="pt-8">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <Avatar className="h-40 w-40 border-4 border-primary/10 shadow-xl">
                                        <AvatarImage src={user.image || undefined} alt={user.name} />
                                        <AvatarFallback className="text-4xl font-black">{user.name[0]}</AvatarFallback>
                                    </Avatar>

                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-black">{user.name}</h1>
                                        <p className="text-primary font-bold uppercase tracking-widest text-xs">{category?.name || "General Tutor"}</p>

                                        <div className="flex items-center justify-center gap-1 text-yellow-500 bg-yellow-400/10 px-4 py-1 rounded-full w-fit mx-auto mt-2">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="font-black text-foreground">{rating.toFixed(1)}</span>
                                            <span className="text-[10px] font-bold text-muted-foreground ml-1">({totalReviews} reviews)</span>
                                        </div>
                                    </div>

                                    <div className="w-full pt-6">
                                        <div className="flex items-center justify-between p-5 bg-primary/5 rounded-3xl border border-primary/10">
                                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Hourly Rate</span>
                                            <span className="text-2xl font-black text-primary">{formatPrice(hourlyRate)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-14 rounded-full text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                                        size="lg"
                                        onClick={handleBookClick}
                                        disabled={!authLoading && !!authUser && authUser.role !== "STUDENT"}
                                    >
                                        {authLoading ? "Checking..." : (authUser && authUser.role !== "STUDENT" ? "Only Students Can Book" : "Book a Session")}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <Card className="rounded-3xl border-primary/5 shadow-sm border overflow-hidden">
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="text-sm font-black uppercase tracking-widest">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-2 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                                        <Mail className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">{user.email}</span>
                                </div>
                                {user.phone && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="p-2 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                                            <Phone className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium text-muted-foreground">{user.phone}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        <Card className="rounded-3xl border-primary/5 shadow-sm border overflow-hidden">
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="text-sm font-black uppercase tracking-widest">About Me</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-muted-foreground leading-relaxed font-medium">
                                    {bio || "This tutor hasn't shared their bio yet."}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Expertise */}
                        {expertise && expertise.length > 0 && (
                            <Card className="rounded-3xl border-primary/5 shadow-sm border overflow-hidden">
                                <CardHeader className="bg-muted/30">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">Specialties & Expertise</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="flex flex-wrap gap-2">
                                        {expertise.map((skill) => (
                                            <Badge key={skill} variant="secondary" className="text-xs font-bold py-1.5 px-4 rounded-full bg-primary/5 text-primary border-primary/10">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Availability */}
                        {availability && availability.some(a => a.isAvailable) && (
                            <Card className="rounded-3xl border-primary/5 shadow-sm border overflow-hidden">
                                <CardHeader className="bg-muted/30">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">Availability Schedule</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="grid gap-3">
                                        {availability
                                            .filter(slot => slot.isAvailable)
                                            .sort((a, b) => Number(a.dayOfWeek) - Number(b.dayOfWeek))
                                            .map((slot) => (
                                                <div key={slot.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-primary/5 group hover:bg-muted/30 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <Clock className="h-4 w-4 text-primary/60" />
                                                        <span className="font-bold text-muted-foreground uppercase tracking-wider text-xs">
                                                            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][Number(slot.dayOfWeek)]}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs font-black text-primary">
                                                        {slot.startTime} - {slot.endTime}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Reviews */}
                        <Card className="rounded-3xl border-primary/5 shadow-sm border overflow-hidden">
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="text-sm font-black uppercase tracking-widest">Student Testimonials ({totalReviews})</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                {isReviewsLoading ? (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground animate-pulse font-bold uppercase tracking-widest text-[10px]">Loading Reviews...</p>
                                    </div>
                                ) : reviews && reviews.length > 0 ? (
                                    <div className="space-y-6">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-12 w-12 border border-primary/5">
                                                            <AvatarImage src={review.student.image || undefined} />
                                                            <AvatarFallback className="font-bold">{review.student.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-bold text-sm tracking-tight">{review.student.name}</p>
                                                            <div className="flex items-center gap-0.5 mt-0.5">
                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-3 w-3 ${i < review.rating
                                                                            ? "fill-yellow-400 text-yellow-400"
                                                                            : "text-muted-foreground/30"
                                                                            }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pt-1">
                                                        {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                    </span>
                                                </div>
                                                {review.comment && (
                                                    <p className="text-sm text-muted-foreground italic leading-relaxed pl-16">
                                                        &quot;{review.comment}&quot;
                                                    </p>
                                                )}
                                                <Separator className="bg-primary/5" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed rounded-3xl bg-muted/20 border-primary/5">
                                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">No reviews yet for this tutor.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                tutorId={tutor.id}
                tutorName={user.name}
                hourlyRate={hourlyRate}
                onSubmit={handleBooking}
            />
        </>
    );
}
