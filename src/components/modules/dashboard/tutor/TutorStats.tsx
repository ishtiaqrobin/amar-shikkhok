"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, CheckCircle, CreditCard, Star } from "lucide-react";
import type { TutorStats as TutorStatsType } from "@/types/tutor.type";
import { formatPrice } from "@/lib/utils";

interface TutorStatsProps {
    stats: TutorStatsType | null;
}

export function TutorStats({ stats }: TutorStatsProps) {
    const cards = [
        {
            title: "Total Bookings",
            value: stats?.totalBookings || 0,
            icon: BookOpen,
            description: "Total requests received",
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Upcoming",
            value: stats?.upcomingBookings || 0,
            icon: Calendar,
            description: "Scheduled sessions",
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
        {
            title: "Completed",
            value: stats?.totalSessions || 0,
            icon: CheckCircle,
            description: "Successfully finished",
            color: "text-emerald-600",
            bg: "bg-emerald-100",
        },
        {
            title: "Earnings",
            value: formatPrice(stats?.totalEarnings || 0),
            icon: CreditCard,
            description: "Total revenue earned",
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "Rating",
            value: stats?.rating?.toFixed(1) || "0.0",
            icon: Star,
            description: "Based on student reviews",
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {cards.map((card, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                        <div className={`${card.bg} p-2 rounded-lg`}>
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
