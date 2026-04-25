"use client";

import { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";
import { PaymentHistoryItem, PaymentStats } from "@/types/payment.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, DollarSign, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TutorEarningsPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [payments, setPayments] = useState<PaymentHistoryItem[]>([]);
    const [stats, setStats] = useState<PaymentStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.token) return;
            setIsLoading(true);
            try {
                const [paymentsRes, statsRes] = await Promise.all([
                    paymentService.getPaymentHistory(session.token),
                    paymentService.getPaymentStats(session.token)
                ]);

                if (paymentsRes.data) setPayments(paymentsRes.data);
                if (statsRes.data) setStats(statsRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading) {
            fetchData();
        }
    }, [session?.token, authLoading]);

    const totalEarnings = payments.reduce((sum, p) => sum + p.totalPrice, 0);
    const thisMonthEarnings = payments
        .filter(p => new Date(p.updatedAt).getMonth() === new Date().getMonth())
        .reduce((sum, p) => sum + p.totalPrice, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Earnings Overview</h1>
                    <p className="text-muted-foreground mt-2">Detailed breakdown of your tutoring income</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="rounded-2xl border-none shadow-md bg-primary text-primary-foreground">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest opacity-80">Total Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">{formatPrice(totalEarnings)}</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-md bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-primary">{formatPrice(thisMonthEarnings)}</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-md bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-primary">{formatPrice(stats?.withdrawableBalance || 0)}</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-md bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-primary">{payments.length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-3xl border-primary/5 shadow-sm overflow-hidden border">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        Recent Payments Received
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No earnings history found.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-primary/5">
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] pl-6">Date</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Student</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Subject</TableHead>
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
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                                    {payment.student.image ? (
                                                        <Avatar className="h-8 w-8 border border-primary/10">
                                                            <AvatarImage src={payment.student.image || undefined} />
                                                            <AvatarFallback className="font-bold">
                                                                {payment.student.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    ) : (
                                                        <User className="h-4 w-4 text-primary" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold">{payment.student.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 text-primary text-[10px] font-bold">
                                                {payment.subject}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-black text-primary">{formatPrice(payment.totalPrice)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-500 rounded-full px-3 text-[10px] font-black tracking-widest uppercase">
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
