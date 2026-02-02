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

    console.log("Session from category manager admin page", session)
    console.log("Token from category manger", userToken);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        const { data, error } = await categoryService.getAllCategories();

        if (error) {
            toast.error("Failed to load categories", { description: error.message });
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
        <div className="space-y-6 min-h-screen">
            <div>
                <h1 className="text-3xl font-bold">Category Management</h1>
                <p className="text-muted-foreground mt-2">Create and manage tutoring subjects and descriptors</p>
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
