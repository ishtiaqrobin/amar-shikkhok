"use client";

import { useEffect, useState, useCallback } from "react";
import { CategoryManager } from "@/components/modules/dashboard/admin/CategoryManager";
import { categoryService } from "@/services/category.service";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Category } from "@/types/tutor.type";

export default function AdminCategoriesPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const userToken = session?.token || "";

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        const { data, error } = await categoryService.getAllCategories();

        if (error) {
            toast.error("ক্যাটাগরি লোড করতে সমস্যা হয়েছে", { description: error.message });
            setCategories([]);
        } else {
            setCategories(data || []);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!authLoading) {
            Promise.resolve().then(() => fetchCategories());
        }
    }, [authLoading, fetchCategories]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">বিষয় ব্যবস্থাপনা</h1>
                <p className="text-muted-foreground mt-2">টিউটোরিং এর জন্য নতুন বিষয় যোগ বা এডিট করুন</p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <CategoryManager
                    categories={categories}
                    token={userToken}
                    onRefresh={fetchCategories}
                />
            )}
        </div>
    );
}
