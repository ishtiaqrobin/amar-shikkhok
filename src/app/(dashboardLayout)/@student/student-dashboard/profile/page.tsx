"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function StudentProfilePage() {
    // TODO: Fetch user data from session
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
    });

    const handleSave = async () => {
        // TODO: Implement save functionality
        toast.success("সফল!", {
            description: "প্রোফাইল আপডেট করা হয়েছে",
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">প্রোফাইল</h1>
                <p className="text-muted-foreground mt-2">আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Profile Card */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>প্রোফাইল ছবি</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-2xl">U</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                            ছবি পরিবর্তন করুন
                        </Button>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>ব্যক্তিগত তথ্য</CardTitle>
                        {!isEditing && (
                            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                                সম্পাদনা করুন
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">নাম</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">ইমেইল</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">ফোন</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">বায়ো</Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                disabled={!isEditing}
                                rows={4}
                            />
                        </div>

                        {isEditing && (
                            <div className="flex gap-3 pt-4">
                                <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                                    বাতিল
                                </Button>
                                <Button onClick={handleSave} className="flex-1">
                                    সংরক্ষণ করুন
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
