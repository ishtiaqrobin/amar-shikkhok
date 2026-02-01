"use client";

import { Search, CalendarCheck, GraduationCap } from "lucide-react";

const steps = [
    {
        title: "শিক্ষক খুঁজুন",
        description: "আপনার পছন্দের বিষয় এবং লোকেশন অনুযায়ী সেরা টিউটর ফিল্টার করে পছন্দ করুন।",
        icon: <Search className="h-8 w-8 text-primary" />,
    },
    {
        title: "বুকিং নিশ্চিত করুন",
        description: "শিক্ষকের প্রোফাইল দেখে আপনার সুবিধাজনক সময়ে সেশন বুক করুন।",
        icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    },
    {
        title: "শিখা শুরু করুন",
        description: "পেমেন্ট সম্পন্ন করে আপনার নির্ধারিত সময়ে টিউটরের সাথে ক্লাস শুরু করুন।",
        icon: <GraduationCap className="h-8 w-8 text-primary" />,
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        কিভাবে আমারা কাজ করি?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        খুব সহজেই তিনটি ধাপে আপনার পছন্দের শিক্ষকের সাথে ক্লাস শুরু করতে পারেন।
                    </p>
                </div>

                <div className="relative grid gap-8 md:grid-cols-3">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-full bg-border md:block -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-6 bg-background px-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-4 border-background shadow-sm relative">
                                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                    ০{index + 1}
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
