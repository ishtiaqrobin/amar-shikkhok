"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, GraduationCap, Calendar, CheckCircle2, DollarSign, BookOpen } from "lucide-react";
import { AdminStats as AdminStatsType } from "@/types/admin.type";

interface AdminStatsProps {
    stats: AdminStatsType | null;
}

export function AdminStats({ stats }: AdminStatsProps) {
    const cards = [
        {
            title: "মোট ইউজার",
            value: stats?.totalUsers || 0,
            icon: Users,
            description: `${stats?.totalStudents || 0} ছাত্র, ${stats?.totalTutors || 0} শিক্ষক`,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "মোট বুকিং",
            value: stats?.totalBookings || 0,
            icon: Calendar,
            description: `${stats?.confirmedBookings || 0} নিশ্চিত, ${stats?.completedBookings || 0} সম্পন্ন`,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
        {
            title: "মোট আয়",
            value: `৳${stats?.totalRevenue || 0}`,
            icon: DollarSign,
            description: "সম্পন্ন সেশন থেকে অর্জিত",
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "ক্যাটাগরি",
            value: stats?.totalCategories || 0,
            icon: BookOpen,
            description: "সক্রিয় বিষয়সমূহ",
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
    ];

    const subCards = [
        {
            title: "শিক্ষার্থী",
            value: stats?.totalStudents || 0,
            icon: UserCheck,
            color: "text-indigo-600",
        },
        {
            title: "শিক্ষক",
            value: stats?.totalTutors || 0,
            icon: GraduationCap,
            color: "text-emerald-600",
        },
        {
            title: "সম্পন্ন ক্লাস",
            value: stats?.completedBookings || 0,
            icon: CheckCircle2,
            color: "text-cyan-600",
        }
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

            <div className="grid gap-4 md:grid-cols-3">
                {subCards.map((card, index) => (
                    <Card key={index} className="border-none shadow-sm bg-muted/30">
                        <CardContent className="flex items-center gap-4 py-4">
                            <div className={`${card.color} bg-white p-2 rounded-full shadow-sm`}>
                                <card.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                                <p className="text-xl font-bold">{card.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
