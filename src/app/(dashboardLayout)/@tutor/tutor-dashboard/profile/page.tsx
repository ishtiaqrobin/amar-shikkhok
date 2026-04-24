"use client";

import { useEffect, useState } from "react";
import { TutorProfileForm } from "@/components/modules/dashboard/tutor/TutorProfileForm";
import { ReviewList } from "@/components/modules/dashboard/tutor/ReviewList";
import { TutorAccountSettings } from "@/components/modules/dashboard/tutor/TutorAccountSettings";
import { tutorsService } from "@/services/tutors.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Tutor } from "@/types/tutor.type";
import { useAuth } from "@/hooks/useAuth";

export default function TutorProfilePage() {
    const { user, session, isLoading: authLoading } = useAuth();
    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userId = user?.id || "";
    const userToken = session?.token || "";

    useEffect(() => {
        const fetchTutor = async () => {
            if (authLoading) return;

            if (!userId) {
                setIsLoading(false);
                return;
            }

            // We need to find the tutor profile for this userId
            // Or we can add an endpoint /tutor/me in backend
            const { data } = await tutorsService.getTutors({ search: userId });
            const myTutor = data?.data.find(t => t.userId === userId);

            if (myTutor) {
                // Fetch full tutor details
                const { data: fullTutor } = await tutorsService.getTutorById(myTutor.id);
                setTutor(fullTutor);
            }
            setIsLoading(false);
        };

        fetchTutor();
    }, [userId, authLoading]);

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold">Profile Management</h1>
                    <Skeleton className="h-5 w-[350px] mt-2" />
                </div>

                <div className="space-y-6">
                    <div className="flex gap-2 max-w-[400px]">
                        <Skeleton className="h-10 w-1/2 rounded-md" />
                        <Skeleton className="h-10 w-1/2 rounded-md" />
                    </div>

                    <Card className="border-primary/10 shadow-sm rounded-2xl">
                        <CardHeader>
                            <Skeleton className="h-7 w-[200px]" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-32 w-full rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-10 w-full rounded-xl" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full rounded-xl" /></div>
                                <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-10 w-full rounded-xl" /></div>
                            </div>
                            <Skeleton className="h-11 w-[150px] rounded-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Profile Management</h1>
                <p className="text-muted-foreground mt-2">Manage your personal information and professional profile</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:max-w-[600px] mb-8">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-9">Profile <span className="hidden md:block">Information</span></TabsTrigger>
                    <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-9">Account <span className="hidden md:block">Settings</span></TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-9">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-0 focus-visible:outline-none">
                    <TutorProfileForm tutor={tutor} userToken={userToken} />
                </TabsContent>
                <TabsContent value="account" className="mt-0 focus-visible:outline-none">
                    <TutorAccountSettings userToken={userToken} />
                </TabsContent>
                <TabsContent value="reviews" className="mt-0 focus-visible:outline-none">
                    <ReviewList reviews={tutor?.reviews} tutorId={tutor?.id} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
