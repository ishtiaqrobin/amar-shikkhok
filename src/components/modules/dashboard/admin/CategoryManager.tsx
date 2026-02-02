"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Plus,
    Pencil,
    Trash2,
    Loader2,
    BookOpen
} from "lucide-react";
import { Category } from "@/types/tutor.type";
import { categoryService } from "@/services/category.service";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface CategoryManagerProps {
    categories: Category[];
    token: string;
    onRefresh: () => void;
}

export function CategoryManager({ categories, token, onRefresh }: CategoryManagerProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleOpenDialog = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setName(category.name);
            setDescription(category.description || "");
        } else {
            setEditingCategory(null);
            setName("");
            setDescription("");
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        setLoading(true);
        const payload = { name, description };

        const { error } = editingCategory
            ? await categoryService.updateCategory(token, editingCategory.id, payload)
            : await categoryService.createCategory(token, payload);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success(editingCategory ? "Category updated successfully" : "Category created successfully");
            setIsDialogOpen(false);
            onRefresh();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        setLoading(true);
        const { error } = await categoryService.deleteCategory(token, id);
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Category deleted successfully");
            onRefresh();
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    All Categories ({categories.length})
                </h2>
                <Button onClick={() => handleOpenDialog()} className="shadow-sm rounded-xl">
                    <Plus className="mr-2 h-4 w-4" /> New Category
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Card key={category.id} className="group hover:shadow-md transition-shadow border-none shadow-sm bg-muted/20 rounded-2xl">
                        <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={() => handleOpenDialog(category)}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {category.description || "No description provided"}
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed rounded-3xl bg-muted/10">
                        <p className="text-muted-foreground">No categories found. Create your first category.</p>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-3xl">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Edit Category" : "New Category"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Mathematics, Programming..."
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="desc">Description (Optional)</Label>
                            <Textarea
                                id="desc"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell us more about this category..."
                                rows={4}
                                className="rounded-xl resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading} className="rounded-full px-6">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={loading} className="rounded-full px-8">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editingCategory ? "Update" : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
