"use client";

import { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, DollarSign, Users, CreditCard, Download } from "lucide-react";
import { format } from "date-fns";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { PaymentStats, PaymentHistoryItem } from "@/types/payment.type";
import { useCallback } from "react";
import { settingService, PlatformSetting } from "@/services/setting.service";
import * as XLSX from 'xlsx';

export default function AdminFinancePage() {
    const { session, isLoading: authLoading } = useAuth();
    const [stats, setStats] = useState<PaymentStats | null>(null);
    const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
    const [settings, setSettings] = useState<PlatformSetting[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!session?.token) return;
        setIsLoading(true);
        try {
            const [statsRes, historyRes, settingsRes] = await Promise.all([
                paymentService.getPaymentStats(session.token),
                paymentService.getPaymentHistory(session.token),
                settingService.getAllSettings(session.token)
            ]);

            if (statsRes.data) setStats(statsRes.data);
            if (historyRes.data) setHistory(historyRes.data || []);
            if (settingsRes.data) setSettings(settingsRes.data);
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

    const exportToExcel = () => {
        if (history.length === 0) {
            toast.error("No data to export");
            return;
        }

        const exportData = history.map((item) => ({
            Date: format(new Date(item.sessionDate), "dd MMM, yyyy"),
            Subject: item.subject,
            Student: item.student.name,
            "Student Email": item.student.email,
            Tutor: item.tutor.user.name,
            "Tutor Email": item.tutor.user.email,
            Amount: item.totalPrice,
            Status: item.paymentStatus,
            "Transaction ID": item.transactionId || "N/A"
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        
        // Generate buffer and save
        XLSX.writeFile(workbook, `Finance_Report_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
        toast.success("Excel report downloaded successfully");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Financial Overview</h1>
                    <p className="text-muted-foreground mt-2">Monitor platform revenue and transactions</p>
                </div>
                <Button className="rounded-full gap-2 font-bold" variant="outline" onClick={exportToExcel}>
                    <Download className="h-4 w-4" />
                    Export Report
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="rounded-2xl border-none shadow-md bg-gradient-to-br from-primary to-primary/80 text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-widest">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">{formatPrice(stats?.totalRevenue || 0)}</div>
                        <p className="text-[10px] mt-1 opacity-80">Accumulated since launch</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-md bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-primary">{stats?.totalPayments || 0}</div>
                        <p className="text-[10px] mt-1 text-muted-foreground">Successful transactions</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-md bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Active Tutors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-primary">{stats?.totalTutors || 0}</div>
                        <p className="text-[10px] mt-1 text-muted-foreground">Verified educators</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-md bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Commission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-primary">
                            {settings.find(s => s.key === "PLATFORM_FEE_PERCENT")?.value || "0"}%
                        </div>
                        <p className="text-[10px] mt-1 text-muted-foreground">Standard platform fee</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-3xl border-primary/10 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <CreditCard className="h-4 w-4" /> Global Transaction List
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : history.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No transactions found.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-primary/5">
                                    <TableHead className="pl-6">Date</TableHead>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Tutor</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="pr-6">Transaction ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((item) => (
                                    <TableRow key={item.id} className="border-primary/5 hover:bg-primary/5 transition-colors">
                                        <TableCell className="pl-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{format(new Date(item.updatedAt), "dd MMM, yyyy")}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase">{format(new Date(item.updatedAt), "hh:mm a")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-bold">{item.student.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-bold">{item.tutor.user.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-black text-primary">{formatPrice(item.totalPrice)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-500 rounded-full px-3 text-[9px] font-black tracking-widest uppercase">
                                                {item.paymentStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="pr-6">
                                            <span className="text-[10px] font-mono text-muted-foreground bg-muted p-1 rounded uppercase">
                                                {item.transactionId || "N/A"}
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
