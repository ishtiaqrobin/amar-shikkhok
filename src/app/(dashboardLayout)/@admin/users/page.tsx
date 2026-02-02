"use client";

import { useEffect, useState, useCallback } from "react";
import { UserTable } from "@/components/modules/dashboard/admin/UserTable";
import { adminService } from "@/services/admin.service";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { AdminUser } from "@/types/admin.type";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AdminUsersPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const userToken = session?.token || "";

    const fetchUsers = useCallback(async () => {
        if (!userToken) return;
        setIsLoading(true);
        const role = roleFilter === "ALL" ? undefined : roleFilter;
        const { data, error } = await adminService.getAllUsers(userToken, role);

        if (error) {
            toast.error("ইউজার লিস্ট লোড করতে সমস্যা হয়েছে", { description: error.message });
            setUsers([]);
        } else {
            setUsers(data || []);
        }
        setIsLoading(false);
    }, [userToken, roleFilter]);

    useEffect(() => {
        if (!authLoading && userToken) {
            Promise.resolve().then(() => fetchUsers());
        }
    }, [authLoading, userToken, fetchUsers]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">ইউজার ব্যবস্থাপনা</h1>
                <p className="text-muted-foreground mt-2">প্ল্যাটফর্মের সকল ছাত্র এবং শিক্ষকদের পরিচালনা করুন</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="রোল সিলেক্ট করুন" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">সব ইউজার</SelectItem>
                            <SelectItem value="ADMIN">অ্যাডমিন</SelectItem>
                            <SelectItem value="TUTOR">শিক্ষক</SelectItem>
                            <SelectItem value="STUDENT">শিক্ষার্থী</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <UserTable users={filteredUsers} token={userToken} onRefresh={fetchUsers} />
            )}
        </div>
    );
}
