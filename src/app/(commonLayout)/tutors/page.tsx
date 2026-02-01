import { tutorsService } from "@/services/tutors.service";
import { TutorSearch } from "@/components/modules/tutors/TutorSearch";
import { TutorFilter } from "@/components/modules/tutors/TutorFilter";
import { TutorList } from "@/components/modules/tutors/TutorList";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface TutorsPageProps {
    searchParams: {
        page?: string;
        search?: string;
        minRate?: string;
        maxRate?: string;
        minRating?: string;
        categoryId?: string;
    };
}

export default async function TutorsPage({ searchParams }: TutorsPageProps) {
    const params = await searchParams;
    const page = parseInt(params.page || "1");
    const limit = 12;

    const { data, error } = await tutorsService.getTutors(
        {
            page,
            limit,
            search: params.search,
            minRate: params.minRate ? parseInt(params.minRate) : undefined,
            maxRate: params.maxRate ? parseInt(params.maxRate) : undefined,
            minRating: params.minRating ? parseFloat(params.minRating) : undefined,
            categoryId: params.categoryId,
        },
        { cache: "no-store" }
    );

    if (error || !data) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Tutors</h1>
                    <p className="text-muted-foreground">{error?.message || "Failed to load tutors"}</p>
                </div>
            </div>
        );
    }

    const tutors = data.data || [];
    const meta = data.meta || { page: 1, limit: 12, total: 0, totalPages: 1 };
    const totalPages = meta.totalPages;

    const buildPageUrl = (newPage: number) => {
        const urlParams = new URLSearchParams();
        urlParams.set("page", newPage.toString());
        if (params.search) urlParams.set("search", params.search);
        if (params.minRate) urlParams.set("minRate", params.minRate);
        if (params.maxRate) urlParams.set("maxRate", params.maxRate);
        if (params.minRating) urlParams.set("minRating", params.minRating);
        if (params.categoryId) urlParams.set("categoryId", params.categoryId);
        return `/tutors?${urlParams.toString()}`;
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">All Tutors</h1>
                <p className="text-muted-foreground">
                    Total {meta.total} tutors found
                </p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <TutorSearch />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <TutorFilter />
                </aside>

                {/* Tutors List */}
                <main className="lg:col-span-3">
                    <TutorList tutors={tutors} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                disabled={page <= 1}
                            >
                                <Link href={buildPageUrl(page - 1)}>
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </Link>
                            </Button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum: number;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={page === pageNum ? "default" : "outline"}
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={buildPageUrl(pageNum)}>{pageNum}</Link>
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                disabled={page >= totalPages}
                            >
                                <Link href={buildPageUrl(page + 1)}>
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
