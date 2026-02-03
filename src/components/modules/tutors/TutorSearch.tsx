"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function TutorSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        if (searchQuery.trim()) {
            params.set("search", searchQuery.trim());
        } else {
            params.delete("search");
        }

        params.delete("page"); // Reset to page 1 on search

        startTransition(() => {
            router.push(`/tutors?${params.toString()}`);
        });
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full flex gap-2">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search by teacher name or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-primary/20 bg-muted/30 focus:bg-background transition-all"
                />
                {(isPending) && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                )}
            </div>
            <Button
                type="submit"
                size="icon"
                className="h-12 w-12 rounded-xl shrink-0"
                disabled={isPending}
            >
                <Search className="h-5 w-5" />
            </Button>
        </form>
    );
}
