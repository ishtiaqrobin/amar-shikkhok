"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { tutorsService } from "@/services/tutors.service";
import type { Tutor } from "@/types/tutor.type";

const profileSchema = z.object({
    bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
    expertise: z.string().min(1, { message: "Expertise is required" }),
    hourlyRate: z.number().min(0, { message: "Hourly rate must be a positive number" }),
    experience: z.number().min(0, { message: "Experience must be a positive number" }),
    education: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface TutorProfileFormProps {
    tutor?: Tutor | null;
    userToken: string;
}

export function TutorProfileForm({ tutor, userToken }: TutorProfileFormProps) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            bio: tutor?.bio || "",
            expertise: tutor?.expertise.join(", ") || "",
            hourlyRate: tutor?.hourlyRate || 0,
            experience: tutor?.experience || 0,
            education: tutor?.education || "",
        },
    });

    async function onSubmit(data: ProfileFormValues) {
        try {
            const expertiseArray = data.expertise.split(",").map((s) => s.trim()).filter(Boolean);

            const payload = {
                ...data,
                expertise: expertiseArray,
            };

            const { error } = await tutorsService.updateProfile(userToken, payload);

            if (error) {
                toast.error("Error", { description: error.message });
            } else {
                toast.success("Success!", { description: "Tutor profile updated successfully" });
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Error", { description: "Failed to update tutor profile" });
        }
    }

    return (
        <Card className="border-primary/10 shadow-sm rounded-2xl">
            <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write a few words about your qualifications and teaching style..."
                                            className="min-h-[120px] rounded-xl resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expertise"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Areas of Expertise</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Math, Physics, English..." className="rounded-xl" {...field} />
                                    </FormControl>
                                    <FormDescription>Separate multiple subjects with commas</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hourly Rate ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="rounded-xl"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Years of Experience</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="rounded-xl"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Educational Qualification</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. B.Sc in Computer Science" className="rounded-xl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full md:w-auto px-8 rounded-full h-11 shadow-lg shadow-primary/20">Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
