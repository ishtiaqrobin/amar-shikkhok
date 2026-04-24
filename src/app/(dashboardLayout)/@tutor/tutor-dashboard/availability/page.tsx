"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AvailabilityCalendar } from "@/components/modules/dashboard/tutor/AvailabilityCalendar";
import { tutorsService } from "@/services/tutors.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Tutor } from "@/types/tutor.type";
import { useAuth } from "@/hooks/useAuth";

export default function AvailabilityPage() {
    const { user, session, isLoading: authLoading } = useAuth();
    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userId = user?.id || "";
    const userToken = session?.token || "";

    const fetchTutorData = useCallback(async () => {
        if (authLoading || !userId) {
            if (!authLoading && !userId) setIsLoading(false);
            return;
        }

        try {
            const { data } = await tutorsService.getTutors({ search: userId });
            const myTutor = data?.data.find(t => t.userId === userId);

            if (myTutor) {
                const { data: fullTutor } = await tutorsService.getTutorById(myTutor.id);
                setTutor(fullTutor);
            }
        } catch (error) {
            console.error("Error fetching tutor:", error);
        } finally {
            setIsLoading(false);
        }
    }, [userId, authLoading]);

    useEffect(() => {
        // We use a small timeout or just ensure it's handled in the async function
        fetchTutorData();
    }, [fetchTutorData]);

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-3xl">
                <div>
                    <h1 className="text-3xl font-bold">Availability Management</h1>
                    <Skeleton className="h-5 w-[250px] mt-2" />
                </div>

                <Card className="border-primary/10 shadow-sm rounded-2xl">
                    <CardHeader>
                        <Skeleton className="h-7 w-[200px]" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-primary/5 bg-primary/5 rounded-2xl gap-4">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-6 w-10 rounded-full" />
                                        <Skeleton className="h-6 w-28 rounded-md" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-[130px] rounded-xl" />
                                        <Skeleton className="h-4 w-4" />
                                        <Skeleton className="h-10 w-[130px] rounded-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold">Availability Management</h1>
                <p className="text-muted-foreground mt-2">Set your teaching schedule</p>
            </div>

            <AvailabilityCalendar
                availabilities={tutor?.availabilities || tutor?.availability}
                userToken={userToken}
                onSuccess={fetchTutorData}
            />
        </div>
    );
}
