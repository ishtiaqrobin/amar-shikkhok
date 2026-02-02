"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface AvatarUploadProps {
    currentImage?: string | null;
    onUpdate: (url: string) => Promise<void>;
    name: string;
}

export function AvatarUpload({ currentImage, onUpdate, name }: AvatarUploadProps) {
    const [url, setUrl] = useState(currentImage || "");
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        setIsUpdating(true);
        await onUpdate(url);
        setIsUpdating(false);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={currentImage || undefined} />
                    <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                        {name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Camera className="h-5 w-5" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-3xl">
                        <DialogHeader>
                            <DialogTitle>Update Profile Picture</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image URL</label>
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="rounded-xl border-primary/20"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsOpen(false)} className="rounded-full">
                                Cancel
                            </Button>
                            <Button onClick={handleUpdate} disabled={isUpdating} className="rounded-full px-6">
                                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="text-center">
                <h3 className="font-bold text-xl">{name}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Profile Account</p>
            </div>
        </div>
    );
}
