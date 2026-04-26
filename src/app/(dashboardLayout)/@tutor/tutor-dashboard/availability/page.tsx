"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AvailabilityCalendar } from "@/components/modules/dashboard/tutor/AvailabilityCalendar";
import { tutorsService } from "@/services/tutors.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Tutor } from "@/types/tutor.type";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function AvailabilityPage() {
    const { user, session, isLoading: authLoading } = useAuth();
    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userId = user?.id || "";
    const userToken = session?.token || "";

    const fetchTutorData = useCallback(async () => {
        if (authLoading || !userToken) {
            if (!authLoading && !userToken) setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await tutorsService.getMyProfile(userToken);

            if (data) {
                setTutor(data);
            } else if (error) {
                console.error("Error fetching tutor:", error);
            }
        } catch (error) {
            console.error("Error fetching tutor:", error);
        } finally {
            setIsLoading(false);
        }
    }, [userToken, authLoading]);

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

    if (!tutor) {
        return (
            <div className="space-y-6 max-w-3xl">
                <div>
                    <h1 className="text-3xl font-bold">Availability Management</h1>
                    <p className="text-muted-foreground mt-2">Set your teaching schedule</p>
                </div>

                <Card className="border-destructive/20 bg-destructive/5 rounded-2xl">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="p-3 bg-destructive/10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-destructive">Tutor Profile Not Found</h2>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                You need to create a tutor profile before you can manage your availability.
                                Please complete your profile to get started.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link 
                                href="/tutor-dashboard/profile" 
                                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Create Profile Now
                            </Link>
                        </div>
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
