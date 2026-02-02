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
        minPrice?: string;
        maxPrice?: string;
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
            minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
            maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
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
        if (params.minPrice) urlParams.set("minPrice", params.minPrice);
        if (params.maxPrice) urlParams.set("maxPrice", params.maxPrice);
        if (params.minRating) urlParams.set("minRating", params.minRating);
        if (params.categoryId) urlParams.set("categoryId", params.categoryId);
        return `/tutors?${urlParams.toString()}`;
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    All Tutors
                </h1>
                <p className="text-xl text-muted-foreground">
                    Total {meta.total} tutors found
                </p>
            </div>

            {/* Search */}
            <div className="mb-12 max-w-3xl">
                <TutorSearch />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <TutorFilter />
                    </div>
                </aside>

                {/* Tutors List */}
                <main className="lg:col-span-3">
                    {tutors.length === 0 ? (
                        <div className="text-center py-24 border rounded-3xl bg-muted/20 border-border">
                            <p className="text-xl font-medium text-muted-foreground uppercase tracking-wider">Sorry, no tutors found.</p>
                        </div>
                    ) : (
                        <>
                            <TutorList tutors={tutors} />

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-16 flex items-center justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        asChild
                                        disabled={page <= 1}
                                        className="rounded-xl"
                                    >
                                        <Link href={buildPageUrl(page - 1)}>
                                            <ChevronLeft className="h-4 w-4" />
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
                                                    className="rounded-xl w-10"
                                                >
                                                    <Link href={buildPageUrl(pageNum)}>{pageNum}</Link>
                                                </Button>
                                            );
                                        })}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        asChild
                                        disabled={page >= totalPages}
                                        className="rounded-xl"
                                    >
                                        <Link href={buildPageUrl(page + 1)}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
