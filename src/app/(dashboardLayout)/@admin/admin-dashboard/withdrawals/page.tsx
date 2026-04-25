"use client";

import { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Landmark, Check, X, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Withdrawal } from "@/types/payment.type";
import { useCallback } from "react";

export default function AdminWithdrawalsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
    const [transactionId, setTransactionId] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [filterStatus, setFilterStatus] = useState("PENDING");

    const fetchWithdrawals = useCallback(async () => {
        if (!session?.token) return;
        setIsLoading(true);
        try {
            const { data } = await paymentService.getAllWithdrawals(session.token, filterStatus);
            if (data) setWithdrawals(data);
        } catch (err) {
            console.error("Error fetching withdrawals:", err);
        } finally {
            setIsLoading(false);
        }
    }, [session?.token, filterStatus]);

    useEffect(() => {
        if (!authLoading) {
            fetchWithdrawals();
        }
    }, [authLoading, fetchWithdrawals]);

    const handleUpdateStatus = async (status: "APPROVED" | "REJECTED") => {
        if (!session?.token || !selectedWithdrawal) return;

        if (status === "APPROVED" && !transactionId) {
            toast.error("Transaction ID is required for approval");
            return;
        }

        setIsUpdating(true);
        const { error } = await paymentService.updateWithdrawalStatus(
            session.token,
            selectedWithdrawal.id,
            { status, transactionId: status === "APPROVED" ? transactionId : undefined }
        );

        if (error) {
            toast.error(error.message);
        } else {
            toast.success(`Request ${status.toLowerCase()} successfully`);
            setSelectedWithdrawal(null);
            setTransactionId("");
            fetchWithdrawals();
        }
        setIsUpdating(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Withdrawal Management</h1>
                    <p className="text-muted-foreground mt-2">Approve or reject tutor payout requests</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant={filterStatus === "PENDING" ? "default" : "outline"}
                        onClick={() => setFilterStatus("PENDING")}
                        className="rounded-full"
                    >
                        Pending
                    </Button>
                    <Button
                        variant={filterStatus === "APPROVED" ? "default" : "outline"}
                        onClick={() => setFilterStatus("APPROVED")}
                        className="rounded-full"
                    >
                        Approved
                    </Button>
                    <Button
                        variant={filterStatus === "REJECTED" ? "default" : "outline"}
                        onClick={() => setFilterStatus("REJECTED")}
                        className="rounded-full"
                    >
                        Rejected
                    </Button>
                </div>
            </div>

            <Card className="rounded-3xl border-primary/10 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Landmark className="h-4 w-4" /> Withdrawal Requests
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : withdrawals.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No withdrawal requests found for this status.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-primary/5">
                                    <TableHead className="pl-6">Tutor</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Request Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="pr-6 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {withdrawals.map((w) => (
                                    <TableRow key={w.id} className="border-primary/5">
                                        <TableCell className="pl-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{w.tutor.user.name}</span>
                                                <span className="text-[10px] text-muted-foreground">{w.tutor.user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-black text-primary">{formatPrice(w.amount)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">{format(new Date(w.createdAt), "dd MMM, yyyy")}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest",
                                                w.status === "APPROVED" ? "bg-green-500" :
                                                    w.status === "REJECTED" ? "bg-red-500" : "bg-yellow-500"
                                            )}>
                                                {w.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="pr-6 text-right">
                                            {w.status === "PENDING" && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => setSelectedWithdrawal(w)}
                                                    className="rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-bold"
                                                >
                                                    Process
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog open={!!selectedWithdrawal} onOpenChange={() => setSelectedWithdrawal(null)}>
                <DialogContent className="rounded-3xl">
                    <DialogHeader>
                        <DialogTitle>Process Withdrawal Request</DialogTitle>
                    </DialogHeader>
                    {selectedWithdrawal && (
                        <div className="space-y-4 pt-4">
                            <div className="p-4 bg-muted/50 rounded-2xl space-y-2 border border-primary/5">
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Tutor</span>
                                    <span className="text-sm font-bold">{selectedWithdrawal.tutor.user.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Amount</span>
                                    <span className="text-sm font-black text-primary">{formatPrice(selectedWithdrawal.amount)}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="transactionId">Transaction ID (Required for Approval)</Label>
                                <Input
                                    id="transactionId"
                                    placeholder="Enter Stripe/Bank transaction ID"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 rounded-full border-red-200 text-red-500 hover:bg-red-50"
                                    onClick={() => handleUpdateStatus("REJECTED")}
                                    disabled={isUpdating}
                                >
                                    Reject
                                </Button>
                                <Button
                                    className="flex-1 rounded-full"
                                    onClick={() => handleUpdateStatus("APPROVED")}
                                    disabled={isUpdating}
                                >
                                    Approve & Complete
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
