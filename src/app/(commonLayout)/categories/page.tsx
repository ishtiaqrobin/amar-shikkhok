"use client";

import { useCategories } from "@/hooks/useCategories";
import { CategoryCard } from "@/components/modules/category/CategoryCard";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CategoriesPage() {
    const { categories, isLoading, error } = useCategories();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-12 min-h-[70vh]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Learning Categories
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Browse our diverse subjects and find the perfect mentor for your needs.
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-10 h-12 rounded-xl bg-muted/30 focus:bg-background transition-all border-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground font-bold uppercase tracking-widest">Loading Content...</p>
                </div>
            ) : error ? (
                <div className="text-center py-24 border rounded-3xl bg-destructive/5 text-destructive border-destructive/10">
                    <p className="text-lg font-black">{error}</p>
                    <p className="text-xs font-bold uppercase tracking-widest mt-2">Please try again after some time</p>
                </div>
            ) : filteredCategories.length === 0 ? (
                <div className="text-center py-24 border rounded-3xl bg-muted/20 border-border">
                    <p className="text-xl font-medium text-muted-foreground uppercase tracking-widest">Sorry, no categories found.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            )}
        </div>
    );
}
