import { tutorsService } from "@/services/tutors.service";
import { notFound } from "next/navigation";
import { TutorProfileClient } from "./TutorProfileClient";

interface TutorProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function TutorProfilePage({ params }: TutorProfilePageProps) {
    const { id } = await params;

    const { data: tutor, error } = await tutorsService.getTutorById(id, {
        cache: "no-store",
    });

    if (error || !tutor) {
        notFound();
    }

    return <TutorProfileClient tutor={tutor} />;
}
