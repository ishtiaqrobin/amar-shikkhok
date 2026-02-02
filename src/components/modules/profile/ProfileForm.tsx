"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userService } from "@/services/user.service";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, User, Phone, Mail } from "lucide-react";
import { User as UserType } from "@/types/tutor.type";

const profileSchema = z.object({
    name: z.string().min(2, "নাম অন্তত ২ অক্ষরের হতে হবে"),
    phone: z.string().optional(),
    image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    user: UserType;
    token: string;
    onSuccess?: () => void;
}

export function ProfileForm({ user, token, onSuccess }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || "",
            phone: user.phone || "",
            image: user.image || "",
        },
    });

    async function onSubmit(values: ProfileFormValues) {
        setIsLoading(true);
        const { error } = await userService.updateProfile(token, values);

        if (error) {
            toast.error("Error", { description: error.message });
        } else {
            toast.success("Profile updated successfully!");
            if (onSuccess) onSuccess();
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" /> Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} className="h-11 rounded-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormItem>
                        <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" /> Email (Not editable)
                        </FormLabel>
                        <FormControl>
                            <Input value={user.email} disabled className="h-11 rounded-xl bg-muted/50" />
                        </FormControl>
                    </FormItem>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} className="h-11 rounded-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormItem>
                        <FormLabel className="flex items-center gap-2">Position / Role</FormLabel>
                        <FormControl>
                            <Input value={user.role} disabled className="h-11 rounded-xl bg-muted/50 uppercase" />
                        </FormControl>
                    </FormItem>
                </div>

                <Button type="submit" className="w-full md:w-auto px-8 rounded-full h-11" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </Form>
    );
}
