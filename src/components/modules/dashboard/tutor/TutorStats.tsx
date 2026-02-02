"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, CheckCircle, CreditCard, Star } from "lucide-react";
import type { TutorStats as TutorStatsType } from "@/types/tutor.type";
import { formatPrice } from "@/lib/utils";

interface TutorStatsProps {
    stats: TutorStatsType | null;
}

export function TutorStats({ stats }: TutorStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="border-primary/10 shadow-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
                    <p className="text-xs text-muted-foreground">Total requests received</p>
                </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.upcomingBookings || 0}</div>
                    <p className="text-xs text-muted-foreground">Scheduled sessions</p>
                </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.totalSessions || 0}</div>
                    <p className="text-xs text-muted-foreground">Successfully finished</p>
                </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Earnings</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(stats?.totalRevenue || 0)}</div>
                    <p className="text-xs text-muted-foreground">Total revenue earned</p>
                </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rating</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.rating?.toFixed(1) || "0.0"}</div>
                    <p className="text-xs text-muted-foreground">Based on student reviews</p>
                </CardContent>
            </Card>
        </div>
    );
}
