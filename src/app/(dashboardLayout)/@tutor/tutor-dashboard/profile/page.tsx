"use client";

import { useEffect, useState } from "react";
import { TutorProfileForm } from "@/components/modules/dashboard/tutor/TutorProfileForm";
import { ReviewList } from "@/components/modules/dashboard/tutor/ReviewList";
import { tutorsService } from "@/services/tutors.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
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
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold">Profile Management</h1>
                <p className="text-muted-foreground mt-2">Update your information that students will see</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="profile">Profile Information</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-6">
                    <TutorProfileForm tutor={tutor} userToken={userToken} />
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                    <ReviewList reviews={tutor?.reviews} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
