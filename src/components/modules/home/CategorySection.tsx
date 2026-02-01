"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Code, FlaskConical, Languages, Music, Palette, Pi, Atom } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        name: "Mathematics",
        icon: <Pi className="h-8 w-8 text-blue-500" />,
        count: "120+ Tutors",
        url: "/tutors?category=mathematics",
        color: "bg-blue-50 dark:bg-blue-900/10",
    },
    {
        name: "Science",
        icon: <FlaskConical className="h-8 w-8 text-green-500" />,
        count: "85+ Tutors",
        url: "/tutors?category=science",
        color: "bg-green-50 dark:bg-green-900/10",
    },
    {
        name: "English",
        icon: <Languages className="h-8 w-8 text-purple-500" />,
        count: "150+ Tutors",
        url: "/tutors?category=english",
        color: "bg-purple-50 dark:bg-purple-900/10",
    },
    {
        name: "Programming",
        icon: <Code className="h-8 w-8 text-orange-500" />,
        count: "60+ Tutors",
        url: "/tutors?category=programming",
        color: "bg-orange-50 dark:bg-orange-900/10",
    },
    {
        name: "Physics",
        icon: <Atom className="h-8 w-8 text-cyan-500" />,
        count: "95+ Tutors",
        url: "/tutors?category=physics",
        color: "bg-cyan-50 dark:bg-cyan-900/10",
    },
    {
        name: "Literature",
        icon: <BookOpen className="h-8 w-8 text-red-500" />,
        count: "40+ Tutors",
        url: "/tutors?category=literature",
        color: "bg-red-50 dark:bg-red-900/10",
    },
    {
        name: "Music",
        icon: <Music className="h-8 w-8 text-pink-500" />,
        count: "25+ Tutors",
        url: "/tutors?category=music",
        color: "bg-pink-50 dark:bg-pink-900/10",
    },
    {
        name: "Arts",
        icon: <Palette className="h-8 w-8 text-yellow-600" />,
        count: "30+ Tutors",
        url: "/tutors?category=arts",
        color: "bg-yellow-50 dark:bg-yellow-900/10",
    },
];

export function CategorySection() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Popular Categories
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Select your favorite subject and find the best tutor.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.url}>
                            <Card className="h-full transition-all hover:border-primary hover:shadow-md hover:-translate-y-1">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}>
                                        {category.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-foreground">{category.name}</h3>
                                        <p className="text-xs text-muted-foreground">{category.count}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/categories"
                        className="text-primary font-semibold hover:underline decoration-2 underline-offset-4"
                    >
                        See All Categories →
                    </Link>
                </div>
            </div>
        </section>
    );
}
