"use client";

import { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Wallet, History, Send, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

import { Withdrawal, PaymentStats } from "@/types/payment.type";
import { useCallback } from "react";

export default function TutorWithdrawalsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [stats, setStats] = useState<PaymentStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [amount, setAmount] = useState("");
    const [notes, setNotes] = useState("");

    const fetchData = useCallback(async () => {
        if (!session?.token) return;
        setIsLoading(true);
        try {
            const [withdrawalsRes, statsRes] = await Promise.all([
                paymentService.getMyWithdrawals(session.token),
                paymentService.getPaymentStats(session.token)
            ]);

            if (withdrawalsRes.data) setWithdrawals(withdrawalsRes.data);
            if (statsRes.data) setStats(statsRes.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setIsLoading(false);
        }
    }, [session?.token]);

    useEffect(() => {
        if (!authLoading) {
            fetchData();
        }
    }, [authLoading, fetchData]);

    const handleWithdrawalRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.token) return;

        const withdrawalAmount = parseFloat(amount);
        if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            toast.error("Invalid amount");
            return;
        }

        if (withdrawalAmount > (stats?.withdrawableBalance || 0)) {
            toast.error("Insufficient balance");
            return;
        }

        setIsSubmitting(true);
        const { error } = await paymentService.requestWithdrawal(session.token, {
            amount: withdrawalAmount,
            notes
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Withdrawal request submitted successfully");
            setAmount("");
            setNotes("");
            fetchData();
        }
        setIsSubmitting(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Withdrawals</h1>
                <p className="text-muted-foreground mt-2">Manage your earnings and payout requests</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1 h-full rounded-3xl border-primary/10 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Send className="h-5 w-5 text-primary" /> Request Payout
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleWithdrawalRequest} className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Withdrawable Balance</Label>
                                <div className="text-3xl font-black text-primary">
                                    {formatPrice(stats?.withdrawableBalance || 0)}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount to Withdraw</Label>
                                <Input 
                                    id="amount" 
                                    type="number" 
                                    placeholder="0.00" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Input 
                                    id="notes" 
                                    placeholder="Any notes..." 
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full rounded-xl font-bold" 
                                disabled={isSubmitting || (stats?.withdrawableBalance || 0) <= 0}
                            >
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Request Withdrawal"}
                            </Button>
                            <p className="text-[10px] text-muted-foreground flex items-start gap-1">
                                <AlertCircle className="h-3 w-3 mt-0.5" />
                                Payouts are usually processed within 3-5 business days via Stripe.
                            </p>
                        </form>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 rounded-3xl border-primary/10 shadow-sm overflow-hidden">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <History className="h-4 w-4" /> Withdrawal History
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : withdrawals.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground">No withdrawal requests found.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-primary/5">
                                        <TableHead className="pl-6">Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="pr-6">Transaction ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {withdrawals.map((w) => (
                                        <TableRow key={w.id} className="border-primary/5">
                                            <TableCell className="pl-6">
                                                <span className="text-sm font-medium">{format(new Date(w.createdAt), "dd MMM, yyyy")}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-bold">{formatPrice(w.amount)}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={
                                                    w.status === "APPROVED" ? "bg-green-500" : 
                                                    w.status === "REJECTED" ? "bg-red-500" : "bg-yellow-500"
                                                }>
                                                    {w.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="pr-6">
                                                <span className="text-[10px] font-mono text-muted-foreground">
                                                    {w.transactionId || "Pending"}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
