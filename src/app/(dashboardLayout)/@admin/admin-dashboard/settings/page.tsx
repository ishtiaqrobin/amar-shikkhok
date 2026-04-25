"use client";

import { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Settings, Percent, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { PlatformSetting } from "@/types/payment.type";
import { useCallback } from "react";

export default function AdminSettingsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [settings, setSettings] = useState<PlatformSetting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [platformFee, setPlatformFee] = useState("");

    const fetchSettings = useCallback(async () => {
        if (!session?.token) return;
        setIsLoading(true);
        try {
            const { data } = await paymentService.getSettings(session.token);
            if (data) {
                setSettings(data);
                const fee = data.find((s) => s.key === "PLATFORM_FEE_PERCENT");
                if (fee) setPlatformFee(fee.value);
            }
        } catch (err) {
            console.error("Error fetching settings:", err);
        } finally {
            setIsLoading(false);
        }
    }, [session?.token]);

    useEffect(() => {
        if (!authLoading) {
            fetchSettings();
        }
    }, [authLoading, fetchSettings]);

    const handleSaveFee = async () => {
        if (!session?.token) return;
        const fee = parseFloat(platformFee);
        if (isNaN(fee) || fee < 0 || fee > 100) {
            toast.error("Invalid commission percentage (0-100)");
            return;
        }

        setIsSaving(true);
        const { error } = await paymentService.updateSetting(session.token, {
            key: "PLATFORM_FEE_PERCENT",
            value: platformFee
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Platform fee updated successfully");
            fetchSettings();
        }
        setIsSaving(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Platform Settings</h1>
                <p className="text-muted-foreground mt-2">Configure global platform behavior and financials</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-3xl border-primary/10 shadow-sm overflow-hidden">
                    <CardHeader className="bg-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <Percent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Commission Settings</CardTitle>
                                <CardDescription>Set the percentage platform takes from each booking</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-10">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="fee">Global Platform Fee (%)</Label>
                                    <div className="relative">
                                        <Input
                                            id="fee"
                                            type="number"
                                            placeholder="10"
                                            value={platformFee}
                                            onChange={(e) => setPlatformFee(e.target.value)}
                                            className="rounded-xl pr-10"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                                            %
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                        This fee is automatically deducted from the tutor&apos;s earnings upon successful payment.
                                    </p>
                                </div>

                                <Button
                                    onClick={handleSaveFee}
                                    className="w-full rounded-xl font-bold gap-2"
                                    disabled={isSaving}
                                >
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    Save Changes
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-primary/10 shadow-sm overflow-hidden opacity-60">
                    <CardHeader className="bg-muted/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-xl">
                                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Security Settings</CardTitle>
                                <CardDescription>Coming soon: Advanced security and verification options</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground text-center py-10 italic">
                            These settings are currently under development.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
