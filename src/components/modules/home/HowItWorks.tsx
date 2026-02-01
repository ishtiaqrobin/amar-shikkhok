"use client";

import { Search, CalendarCheck, GraduationCap } from "lucide-react";

const steps = [
    {
        title: "Find a Tutor",
        description: "Filter and choose the best tutor according to your preferred subject and location.",
        icon: <Search className="h-8 w-8 text-primary" />,
    },
    {
        title: "Confirm Booking",
        description: "Check the tutor's profile and book a session at your convenient time.",
        icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    },
    {
        title: "Start Learning",
        description: "Complete the payment and start your class with the tutor at your scheduled time.",
        icon: <GraduationCap className="h-8 w-8 text-primary" />,
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Easily start your class with your preferred tutor in three simple steps.
                    </p>
                </div>

                <div className="relative grid gap-8 md:grid-cols-3">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-full bg-border md:block -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-6 bg-background px-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-4 border-background shadow-sm relative">
                                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                    {index + 1}
                                </span>
                                {step.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
