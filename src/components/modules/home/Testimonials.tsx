"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "তানভীর রহমান",
        role: "এইচএসসি শিক্ষার্থী",
        content: "এই প্ল্যাটফর্মের মাধ্যমে আমি আমার ফিজিক্সের কঠিন বিষয়গুলো খুব সহজেই বুঝতে পেরেছি। শিক্ষকদের বোঝানোর ধরন চমৎকার।",
        image: "https://i.pravatar.cc/150?u=10",
    },
    {
        name: "ফারিয়া ইসলাম",
        role: "মেডিকেল ভর্তি পরীক্ষার্থী",
        content: "বায়োলজি প্রিপারেশনের জন্য আমি এখানে সেরা টিউটর পেয়েছি। ডাউট ক্লিয়ারিং সেশনগুলো আমার খুব উপকারে এসেছে।",
        image: "https://i.pravatar.cc/150?u=11",
    },
    {
        name: "আসিফ জামান",
        role: "নবম শ্রেণীর ছাত্র",
        content: "গণিতে আমার খুব ভয় ছিল, কিন্তু এখানকার টিউটরের কাছে পড়ার পর এখন ম্যাথ আমার প্রিয় বিষয়। ধন্যবাদ আমার শিক্ষককে।",
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
                        শিক্ষার্থীদের অভিজ্ঞতা
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        হাজারো শিক্ষার্থী তাদের স্বপ্নের পথে এগিয়ে যাচ্ছে আমার শিক্ষকের সাথে।
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
