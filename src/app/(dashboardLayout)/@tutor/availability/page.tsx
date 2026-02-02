"use client";

import { useEffect, useState } from "react";
import { AvailabilityCalendar } from "@/components/modules/dashboard/tutor/AvailabilityCalendar";
import { tutorsService } from "@/services/tutors.service";
import { Loader2 } from "lucide-react";
import type { Tutor } from "@/types/tutor.type";
import { useAuth } from "@/hooks/useAuth";

export default function AvailabilityPage() {
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

            const { data } = await tutorsService.getTutors({ search: userId });
            const myTutor = data?.data.find(t => t.userId === userId);

            if (myTutor) {
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
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold">সময়সূচী ব্যবস্থাপনা</h1>
                <p className="text-muted-foreground mt-2">আপনার পড়ানোর সময় নির্ধারণ করুন</p>
            </div>

            <AvailabilityCalendar
                availabilities={tutor?.availability}
                userToken={userToken}
            />
        </div>
    );
}
