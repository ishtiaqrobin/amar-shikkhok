"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-20 bg-background px-4">
            <div className="container mx-auto">
                <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    {/* Background shapes */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-black/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left space-y-6 max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
                                Are you a skilled teacher? <br />
                                <span className="text-primary-foreground/80">Join us today!</span>
                            </h2>
                            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                                Share your knowledge with thousands of students and build your career.
                                This is your chance to establish yourself as a top tutor.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                asChild
                                size="lg"
                                variant="secondary"
                                className="rounded-full font-bold px-8 py-7 text-lg hover:scale-105 transition-transform shadow-lg"
                            >
                                <Link href="/register">Join as a Teacher</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="rounded-full font-bold px-8 py-7 text-lg bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white hover:scale-105 transition-transform"
                            >
                                <Link href="/tutors">Start Learning</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
