"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Tanvir Rahman",
        role: "HSC Student",
        content: "Through this platform, I was able to understand difficult physics concepts very easily. The teachers explain things wonderfully.",
        image: "https://i.pravatar.cc/150?u=10",
    },
    {
        name: "Faria Islam",
        role: "Medical Admission Candidate",
        content: "I found the best tutor for biology preparation here. The doubt clearing sessions were very helpful.",
        image: "https://i.pravatar.cc/150?u=11",
    },
    {
        name: "Asif Zaman",
        role: "9th Grade Student",
        content: "I used to be very afraid of math, but after studying with a tutor here, it has become my favorite subject. Thank you to my teacher.",
        image: "https://i.pravatar.cc/150?u=12",
    },
];

export function Testimonials() {
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
                        Thousands of students are advancing on their dream path with my teacher.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="relative overflow-visible border-none bg-muted/40 shadow-none hover:bg-muted/60 transition-colors">
                            <CardContent className="pt-12 pb-8 px-6">
                                <div className="absolute -top-6 left-6">
                                    <Avatar className="h-14 w-14 border-4 border-background shadow-md">
                                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="absolute top-4 right-6 text-primary/20">
                                    <Quote className="h-8 w-8 fill-current" />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-foreground italic leading-relaxed">
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                    <div className="space-y-0.5">
                                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
