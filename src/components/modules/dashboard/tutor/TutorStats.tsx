"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, CheckCircle, CreditCard, Star } from "lucide-react";
import type { TutorStats as TutorStatsType } from "@/types/tutor.type";

interface TutorStatsProps {
    stats: TutorStatsType | null;
}

export function TutorStats({ stats }: TutorStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">মোট বুকিং</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.totalBookings || 0}</div>
                    <p className="text-xs text-muted-foreground">এ পর্যন্ত প্রাপ্ত বুকিং</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">আসন্ন সেশন</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.upcomingBookings || 0}</div>
                    <p className="text-xs text-muted-foreground">আগামী সপ্তাহে</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">সম্পন্ন সেশন</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.totalSessions || 0}</div>
                    <p className="text-xs text-muted-foreground">সফলভাবে সম্পন্ন</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">মোট আয়</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">৳{stats?.totalRevenue.toLocaleString() || 0}</div>
                    <p className="text-xs text-muted-foreground">এ পর্যন্ত ইনকাম</p>
                </CardContent>
            </Card>

            {/* Optional: Rating Card */}
            <Card className="lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">গড় রেটিং</CardTitle>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats?.rating?.toFixed(1) || "0.0"}</div>
                    <p className="text-xs text-muted-foreground">ছাত্রদের মতামত অনুযায়ী</p>
                </CardContent>
            </Card>
        </div>
    );
}
