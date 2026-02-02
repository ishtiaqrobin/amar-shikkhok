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
    "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
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
                toast.error("কিছু ত্রুটি হয়েছে", { description: "সবগুলো সময়সূচী আপডেট করা সম্ভব হয়নি" });
            } else {
                toast.success("সফল!", { description: "সময়সূচী আপডেট করা হয়েছে" });
            }
        } catch (error) {
            console.error("Save availability error:", error);
            toast.error("ত্রুটি", { description: "সময়সূচী আপডেট করতে ব্যর্থ হয়েছে" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>সাপ্তাহিক সময়সূচী</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {schedule.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                            <div className="flex items-center gap-4">
                                <Switch
                                    checked={item.isAvailable}
                                    onCheckedChange={() => toggleDay(index)}
                                />
                                <Label className="text-base font-semibold w-24">
                                    {DAYS[index]}
                                </Label>
                            </div>

                            {item.isAvailable && (
                                <div className="flex items-center gap-2">
                                    <div className="grid gap-1.5">
                                        <Input
                                            type="time"
                                            value={item.startTime}
                                            onChange={(e) => updateTime(index, "startTime", e.target.value)}
                                            className="w-[120px]"
                                        />
                                    </div>
                                    <span className="text-muted-foreground">থেকে</span>
                                    <div className="grid gap-1.5">
                                        <Input
                                            type="time"
                                            value={item.endTime}
                                            onChange={(e) => updateTime(index, "endTime", e.target.value)}
                                            className="w-[120px]"
                                        />
                                    </div>
                                </div>
                            )}

                            {!item.isAvailable && (
                                <p className="text-sm text-muted-foreground italic">ছুটি</p>
                            )}
                        </div>
                    ))}
                </div>

                <Button onClick={handleSave} disabled={loading} className="w-full">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    পরিবর্তনগুলো সংরক্ষণ করুন
                </Button>
            </CardContent>
        </Card>
    );
}
