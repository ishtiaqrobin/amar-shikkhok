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
                toast.error("ত্রুটি", { description: error.message });
            } else {
                toast.success("সফল!", { description: "প্রোফাইল আপডেট করা হয়েছে" });
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("ত্রুটি", { description: "প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে" });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>শিক্ষক প্রোফাইল</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>বায়ো</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="আপনার যোগ্যতা এবং অভিজ্ঞতা সম্পর্কে বিস্তারিত লিখুন..."
                                            className="min-h-[120px]"
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
                                    <FormLabel>দক্ষতাসমূহ ( Expertise )</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Math, Physics, English (কমা দিয়ে আলাদা করুন)" {...field} />
                                    </FormControl>
                                    <FormDescription>আপনার দক্ষতাসমূহ কমা দিয়ে লিখুন</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ঘণ্টাপ্রতি ফি (৳)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
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
                                        <FormLabel>অভিজ্ঞতা (বছর)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
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
                                    <FormLabel>শিক্ষা</FormLabel>
                                    <FormControl>
                                        <Input placeholder="B.Sc in Computer Science" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full md:w-auto">সংরক্ষণ করুন</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
