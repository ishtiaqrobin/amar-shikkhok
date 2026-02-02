"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProfileForm } from "@/components/modules/profile/ProfileForm";
import { AvatarUpload } from "@/components/modules/profile/AvatarUpload";
import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Settings } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/tutor.type";

export default function StudentProfilePage() {
    const { session, isLoading: authLoading } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const userToken = session?.token || "";

    const fetchProfile = useCallback(async () => {
        if (!userToken) return;
        setIsLoading(true);
        const { data, error } = await userService.getMe(userToken);
        if (!error) {
            setUser(data);
        }
        setIsLoading(false);
    }, [userToken]);

    useEffect(() => {
        if (!authLoading && userToken) {
            Promise.resolve().then(() => fetchProfile());
        }
    }, [userToken, authLoading, fetchProfile]);

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

    if (isLoading || authLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container max-w-5xl mx-auto space-y-8 min-h-screen py-8">
            <div>
                <h1 className="text-3xl font-extrabold flex items-center gap-3">
                    <Settings className="h-8 w-8 text-primary" /> Account Settings
                </h1>
                <p className="text-muted-foreground mt-2">Manage your personal information and profile</p>
            </div>

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
                        <ProfileForm user={user} token={userToken} onSuccess={fetchProfile} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
