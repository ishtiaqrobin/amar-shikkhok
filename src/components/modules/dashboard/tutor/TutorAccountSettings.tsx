"use client";

import { ProfileForm } from "@/components/modules/profile/ProfileForm";
import { AvatarUpload } from "@/components/modules/profile/AvatarUpload";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, UserCog } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/tutor.type";
import { Badge } from "@/components/ui/badge";

interface TutorAccountSettingsProps {
    userToken: string;
}

export function TutorAccountSettings({ userToken }: TutorAccountSettingsProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        if (!userToken) return;
        setIsLoading(true);
        try {
            const { data, error } = await userService.getMe(userToken);
            if (error) {
                toast.error("Failed to load profile", { description: error.message });
            } else if (data) {
                setUser(data);
            }
        } finally {
            setIsLoading(false);
        }
    }, [userToken]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleAvatarUpdate = async (url: string) => {
        if (!userToken) return;

        const { error } = await userService.updateProfile(userToken, { image: url });

        if (error) {
            toast.error("Failed to update profile picture");
        } else {
            toast.success("Profile picture updated successfully");
            fetchProfile();
        }
    };

    const handleProfileUpdate = () => {
        fetchProfile();
    };

    if (isLoading) {
        return (
            <div className="grid gap-8 lg:grid-cols-12">
                <Card className="lg:col-span-4 border-primary/10 shadow-lg rounded-3xl overflow-hidden h-fit">
                    <div className="h-24 bg-muted/20" />
                    <CardContent className="-mt-16 relative flex flex-col items-center">
                        <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
                        <div className="mt-8 space-y-4 w-full">
                            <Skeleton className="h-16 w-full rounded-2xl" />
                            <Skeleton className="h-14 w-full rounded-2xl" />
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-8 border-primary/10 shadow-lg rounded-3xl">
                    <CardHeader>
                        <Skeleton className="h-7 w-[200px]" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-11 w-full rounded-xl" /></div>
                            <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-11 w-full rounded-xl" /></div>
                        </div>
                        <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-11 w-full rounded-xl" /></div>
                        <Skeleton className="h-11 w-[150px] rounded-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="grid gap-8 lg:grid-cols-12">
            <Card className="lg:col-span-4 border-primary/10 shadow-lg rounded-3xl overflow-hidden h-fit">
                <div className="h-24 bg-linear-to-r from-primary/20 to-primary/5" />
                <CardContent className="-mt-16 relative">
                    <AvatarUpload
                        currentImage={user.image}
                        onUpdate={handleAvatarUpdate}
                        name={user.name}
                    />

                    <div className="mt-8 space-y-4">
                        {/* Role Badge */}
                        <div className="p-4 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-sm font-semibold text-foreground">Role</span>
                            </div>
                            <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-wider">
                                <UserCog className="h-3 w-3 mr-1" />
                                Tutor
                            </Badge>
                        </div>

                        <div className="p-4 rounded-2xl bg-muted/50 border border-muted flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Account Status</span>
                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-600">ACTIVE</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50 border border-muted flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Joined Since</span>
                            <span className="text-sm font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-8 border-primary/10 shadow-lg rounded-3xl">
                <CardHeader>
                    <CardTitle>Update Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfileForm user={user} token={userToken} onSuccess={handleProfileUpdate} />
                </CardContent>
            </Card>
        </div>
    );
}
