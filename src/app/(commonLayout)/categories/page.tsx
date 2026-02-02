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
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        সকল বিষয়সমূহ
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        আপনার পছন্দের বিষয় নির্বাচন করুন এবং সেরা শিক্ষকদের খুঁজে নিন।
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="বিষয় খুঁজুন..."
                        className="pl-10 h-12 rounded-xl bg-muted/30 focus:bg-background transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground font-medium">লোড হচ্ছে...</p>
                </div>
            ) : error ? (
                <div className="text-center py-24 border rounded-3xl bg-destructive/5 text-destructive border-destructive/10">
                    <p className="text-lg font-semibold">{error}</p>
                    <p className="text-sm opacity-80 mt-1">দয়া করে একটু পর আবার চেষ্টা করুন।</p>
                </div>
            ) : filteredCategories.length === 0 ? (
                <div className="text-center py-24 border rounded-3xl bg-muted/20 border-border">
                    <p className="text-xl font-medium text-muted-foreground">দুঃখিত, কোনো বিষয় পাওয়া যায়নি।</p>
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
