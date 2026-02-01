"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";

const tutors = [
    {
        id: "1",
        name: "Mehdi Hasan",
        role: "Math Expert",
        rating: 4.9,
        reviews: 42,
        price: "500",
        image: "https://i.pravatar.cc/150?u=1",
        location: "Dhaka",
        expertise: ["Algebra", "Calculus"],
    },
    {
        id: "2",
        name: "Sadia Islam",
        role: "English Lecturer",
        rating: 4.8,
        reviews: 35,
        price: "450",
        image: "https://i.pravatar.cc/150?u=2",
        location: "Chattogram",
        expertise: ["IELTS", "Spoken English"],
    },
    {
        id: "3",
        name: "Foysal Ahmed",
        role: "Physics Teacher",
        rating: 5.0,
        reviews: 28,
        price: "600",
        image: "https://i.pravatar.cc/150?u=3",
        location: "Rajshahi",
        expertise: ["Quantum Physics", "Mechanics"],
    },
    {
        id: "4",
        name: "Tanjila Akter",
        role: "Biology Expert",
        rating: 4.7,
        reviews: 19,
        price: "400",
        image: "https://i.pravatar.cc/150?u=4",
        location: "Sylhet",
        expertise: ["Botany", "Genetics"],
    },
];

export function FeaturedTutors() {
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
                    <Button asChild variant="outline" className="hidden md:flex">
                        <Link href="/tutors">See All Tutors</Link>
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {tutors.map((tutor) => (
                        <Card key={tutor.id} className="overflow-hidden group hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 border-4 border-background group-hover:border-primary/20 transition-colors">
                                            <AvatarImage src={tutor.image} alt={tutor.name} />
                                            <AvatarFallback>{tutor.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-2 right-1/2 translate-x-1/2 flex items-center gap-1 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[10px] font-bold">
                                            <Star className="h-3 w-3 fill-current" />
                                            {tutor.rating}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{tutor.name}</h3>
                                        <p className="text-sm text-primary font-medium">{tutor.role}</p>
                                        <div className="flex items-center justify-center text-xs text-muted-foreground gap-1 pt-1">
                                            <MapPin className="h-3 w-3" />
                                            {tutor.location}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
                                        {tutor.expertise.map((exp) => (
                                            <Badge key={exp} variant="secondary" className="text-[10px] py-0">
                                                {exp}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 flex items-center justify-between border-t bg-muted/10 mt-4 h-16">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Per Hour</span>
                                    <span className="text-lg font-bold text-foreground">৳{tutor.price}</span>
                                </div>
                                <Button size="sm" asChild>
                                    <Link href={`/tutors/${tutor.id}`}>Profile</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/tutors">See All Tutors</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
