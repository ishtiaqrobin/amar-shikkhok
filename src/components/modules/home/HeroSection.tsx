"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import heroImage from "@/assets/images/hero_section.webp";

export function HeroSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/tutors?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <section className="relative overflow-hidden bg-background py-16 lg:py-24">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
                <div className="h-64 w-64 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20">
                <div className="h-48 w-48 rounded-full" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <div className="flex flex-col space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                                Find the perfect tutor, <br />
                                to build your <span className="text-primary">future</span>.
                            </h1>
                            <p className="max-w-lg text-lg text-muted-foreground sm:text-xl">
                                Find the best tutor in your favorite subject and start learning today.
                                Easy booking and the best platform for online learning.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="relative flex w-full max-w-md items-center gap-2 rounded-full border bg-card p-1 shadow-lg transition-shadow hover:shadow-xl focus-within:ring-2 focus-within:ring-primary/20"
                        >
                            <div className="relative flex flex-1 items-center pl-4">
                                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                                <Input
                                    className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 h-10"
                                    type="text"
                                    placeholder="Search by teacher name or subject..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="rounded-full px-6 mr-1">
                                Search
                            </Button>
                        </form>

                        {/* Stats/Badges */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium">
                                <span className="text-primary font-bold">50+</span> Categories
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium">
                                <span className="text-primary font-bold">500+</span> Expert Tutors
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium">
                                <span className="text-primary font-bold">10,000+</span> Classes Completed
                            </div>
                        </div>
                    </div>

                    {/* Image/Visual */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                            <Image
                                src={heroImage}
                                alt="Education"
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                        </div>
                        {/* Floating element */}
                        <div className="absolute -bottom-6 -left-6 z-20 rounded-xl bg-card p-4 shadow-xl border animate-bounce-slow">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                    <span className="text-green-600 dark:text-green-400">⭐</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Best Rating</p>
                                    <p className="text-xs text-muted-foreground">4.9/5 Average</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
