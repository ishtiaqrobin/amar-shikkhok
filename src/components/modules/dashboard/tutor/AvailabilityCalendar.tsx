"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import { tutorsService } from "@/services/tutors.service";
import type { Availability } from "@/types/tutor.type";

const DAYS = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

interface AvailabilityCalendarProps {
    availabilities?: Availability[];
    userToken: string;
}

export function AvailabilityCalendar({ availabilities, userToken }: AvailabilityCalendarProps) {
    const [loading, setLoading] = useState(false);

    // Initialize with existing or defaults
    const [schedule, setSchedule] = useState(
        Array.from({ length: 7 }, (_, i) => {
            const existing = availabilities?.find(a => parseInt(a.dayOfWeek) === i);
            return {
                id: existing?.id,
                dayOfWeek: i,
                startTime: existing?.startTime || "09:00",
                endTime: existing?.endTime || "17:00",
                isAvailable: !!existing,
            };
        })
    );

    const toggleDay = (index: number) => {
        setSchedule(prev => prev.map((item, i) =>
            i === index ? { ...item, isAvailable: !item.isAvailable } : item
        ));
    };

    const updateTime = (index: number, field: "startTime" | "endTime", value: string) => {
        setSchedule(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const promises = schedule.map(async (item) => {
                const payload = {
                    dayOfWeek: item.dayOfWeek.toString(),
                    startTime: item.startTime,
                    endTime: item.endTime,
                };

                if (item.id) {
                    // Update existing
                    return await tutorsService.updateAvailability(userToken, payload);
                } else if (item.isAvailable) {
                    // Create new only if it's marked as available
                    return await tutorsService.addAvailability(userToken, payload);
                }
                return null;
            });

            const results = await Promise.all(promises);
            const errors = results.filter(r => r?.error);

            if (errors.length > 0) {
                toast.error("Error", { description: "Some schedules could not be updated" });
            } else {
                toast.success("Success!", { description: "Weekly schedule updated successfully" });
            }
        } catch (error) {
            console.error("Save availability error:", error);
            toast.error("Error", { description: "Failed to update schedule" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-primary/10 shadow-sm rounded-2xl">
            <CardHeader>
                <CardTitle>Weekly Availability Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4">
                    {schedule.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-primary/5 bg-primary/5 rounded-2xl gap-4 group transition-all hover:bg-primary/10">
                            <div className="flex items-center gap-4">
                                <Switch
                                    checked={item.isAvailable}
                                    onCheckedChange={() => toggleDay(index)}
                                />
                                <Label className="text-base font-bold w-28 uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                                    {DAYS[index]}
                                </Label>
                            </div>

                            {item.isAvailable && (
                                <div className="flex items-center gap-3">
                                    <div className="grid gap-1">
                                        <Input
                                            type="time"
                                            value={item.startTime}
                                            onChange={(e) => updateTime(index, "startTime", e.target.value)}
                                            className="w-[130px] rounded-xl border-primary/20"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">to</span>
                                    <div className="grid gap-1">
                                        <Input
                                            type="time"
                                            value={item.endTime}
                                            onChange={(e) => updateTime(index, "endTime", e.target.value)}
                                            className="w-[130px] rounded-xl border-primary/20"
                                        />
                                    </div>
                                </div>
                            )}

                            {!item.isAvailable && (
                                <p className="text-sm text-muted-foreground font-medium italic">Off Day</p>
                            )}
                        </div>
                    ))}
                </div>

                <Button onClick={handleSave} disabled={loading} className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                    Save Schedule
                </Button>
            </CardContent>
        </Card>
    );
}
