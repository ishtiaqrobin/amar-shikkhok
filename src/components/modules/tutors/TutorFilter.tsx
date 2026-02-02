"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { X, Star, Filter } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function TutorFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { categories } = useCategories();

    const [minRate, setMinRate] = useState<number>(
        parseInt(searchParams.get("minRate") || "0")
    );
    const [maxRate, setMaxRate] = useState<number>(
        parseInt(searchParams.get("maxRate") || "2000")
    );
    const [minRating, setMinRating] = useState<number>(
        parseFloat(searchParams.get("minRating") || "0")
    );
    const [categoryId, setCategoryId] = useState<string>(
        searchParams.get("categoryId") || "all"
    );

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (minRate > 0) {
            params.set("minRate", minRate.toString());
        } else {
            params.delete("minRate");
        }

        if (maxRate < 2000) {
            params.set("maxRate", maxRate.toString());
        } else {
            params.delete("maxRate");
        }

        if (minRating > 0) {
            params.set("minRating", minRating.toString());
        } else {
            params.delete("minRating");
        }

        if (categoryId && categoryId !== "all") {
            params.set("categoryId", categoryId);
        } else {
            params.delete("categoryId");
        }

        params.delete("page"); // Reset to page 1

        router.push(`/tutors?${params.toString()}`);
    };

    const clearFilters = () => {
        setMinRate(0);
        setMaxRate(2000);
        setMinRating(0);
        setCategoryId("all");

        const params = new URLSearchParams();
        const search = searchParams.get("search");
        if (search) params.set("search", search);

        router.push(`/tutors?${params.toString()}`);
    };

    const hasActiveFilters = minRate > 0 || maxRate < 2000 || minRating > 0 || (categoryId && categoryId !== "all");

    return (
        <Card className="border-primary/10 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="h-4 w-4" /> Filter
                    </CardTitle>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Category Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger className="rounded-xl border-primary/20">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Hourly Rate Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Hourly Fee ($)</Label>
                    <div className="space-y-4 px-1">
                        <Slider
                            min={0}
                            max={2000}
                            step={50}
                            value={[minRate, maxRate]}
                            onValueChange={([min, max]) => {
                                setMinRate(min);
                                setMaxRate(max);
                            }}
                            className="w-full"
                        />
                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground p-2 bg-muted/50 rounded-lg">
                            <span>৳{minRate}</span>
                            <span>৳{maxRate}</span>
                        </div>
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Minimum Rating</Label>
                    <div className="space-y-4 px-1">
                        <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={[minRating]}
                            onValueChange={([value]) => setMinRating(value)}
                            className="w-full"
                        />
                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground p-2 bg-muted/50 rounded-lg">
                            <span className="flex items-center gap-1">{minRating.toFixed(1)} <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /></span>
                            <span>5.0 ⭐</span>
                        </div>
                    </div>
                </div>

                {/* Apply Button */}
                <Button onClick={applyFilters} className="w-full rounded-xl h-11 shadow-md shadow-primary/20 transition-all active:scale-95">
                    Apply Filter
                </Button>
            </CardContent>
        </Card>
    );
}
