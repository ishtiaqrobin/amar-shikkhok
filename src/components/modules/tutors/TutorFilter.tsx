"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";

export function TutorFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minRate, setMinRate] = useState<number>(
        parseInt(searchParams.get("minRate") || "0")
    );
    const [maxRate, setMaxRate] = useState<number>(
        parseInt(searchParams.get("maxRate") || "2000")
    );
    const [minRating, setMinRating] = useState<number>(
        parseFloat(searchParams.get("minRating") || "0")
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

        params.delete("page"); // Reset to page 1

        router.push(`/tutors?${params.toString()}`);
    };

    const clearFilters = () => {
        setMinRate(0);
        setMaxRate(2000);
        setMinRating(0);

        const params = new URLSearchParams(searchParams.toString());
        params.delete("minRate");
        params.delete("maxRate");
        params.delete("minRating");
        params.delete("page");

        router.push(`/tutors?${params.toString()}`);
    };

    const hasActiveFilters = minRate > 0 || maxRate < 2000 || minRating > 0;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Filter</CardTitle>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-8 px-2 text-xs"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Hourly Rate Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Hourly Rate (৳)</Label>
                    <div className="space-y-2">
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
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>৳{minRate}</span>
                            <span>৳{maxRate}</span>
                        </div>
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Minimum Rating</Label>
                    <div className="space-y-2">
                        <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={[minRating]}
                            onValueChange={([value]) => setMinRating(value)}
                            className="w-full"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{minRating.toFixed(1)} ⭐</span>
                            <span>5.0 ⭐</span>
                        </div>
                    </div>
                </div>

                {/* Apply Button */}
                <Button onClick={applyFilters} className="w-full">
                    Apply Filter
                </Button>
            </CardContent>
        </Card>
    );
}
