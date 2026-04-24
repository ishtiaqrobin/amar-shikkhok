"use client";

import { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";
import { PaymentHistoryItem } from "@/types/payment.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Calendar, User, GraduationCap } from "lucide-react";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminPaymentsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [payments, setPayments] = useState<PaymentHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            if (!session?.token) return;
            setIsLoading(true);
            const { data, error } = await paymentService.getPaymentHistory(session.token);
            if (error) {
                toast.error("Error", { description: error.message });
            } else {
                setPayments(data || []);
            }
            setIsLoading(false);
        };

        if (!authLoading) {
            fetchPayments();
        }
    }, [session?.token, authLoading]);

    const totalRevenue = payments.reduce((sum, p) => sum + p.totalPrice, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Platform Revenue</h1>
                    <p className="text-muted-foreground mt-2">Oversee all transactions and platform financial health</p>
                </div>
                <Card className="bg-emerald-600 text-white border-none shadow-lg px-6 py-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Total Platform Revenue</p>
                            <p className="text-2xl font-black">{formatPrice(totalRevenue)}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="rounded-3xl border-primary/5 shadow-sm overflow-hidden border">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        All Platform Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No transactions found.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-primary/5">
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] pl-6">Date</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Student</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Tutor</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Amount</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] pr-6">Transaction ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                                        <TableCell className="pl-6 font-medium">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{format(new Date(payment.updatedAt), "dd MMM, yyyy")}</span>
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase">{format(new Date(payment.updatedAt), "hh:mm a")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                                    <User className="h-3 w-3 text-primary" />
                                                </div>
                                                <span className="text-xs font-bold">{payment.student.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center overflow-hidden">
                                                    <GraduationCap className="h-3 w-3 text-secondary-foreground" />
                                                </div>
                                                <span className="text-xs font-bold">{payment.tutor.user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-black text-primary">{formatPrice(payment.totalPrice)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-500 rounded-full px-2 text-[9px] font-black tracking-widest uppercase">
                                                PAID
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="pr-6">
                                            <span className="text-[10px] font-mono text-muted-foreground bg-muted p-1 rounded uppercase tracking-tighter">
                                                {payment.transactionId || "N/A"}
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
    );
}
