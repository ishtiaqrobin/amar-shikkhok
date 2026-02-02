import { TutorCard } from "./TutorCard";
import type { TutorListItem } from "@/types/tutor.type";

interface TutorListProps {
    tutors: TutorListItem[];
}

export function TutorList({ tutors }: TutorListProps) {
    if (tutors.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No tutor found.</p>
                <p className="text-sm text-muted-foreground mt-2">
                    Try again with different filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
            ))}
        </div>
    );
}
