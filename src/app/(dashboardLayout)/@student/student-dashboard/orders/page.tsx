"use client";

import { useEffect, useState } from "react";
import { paymentService } from "@/services/payment.service";
import { useAuth } from "@/hooks/useAuth";
import { PaymentHistoryItem } from "@/types/payment.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingBag, Download, User, Calendar as CalendarIcon, Clock, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function StudentOrdersPage() {
    const { session, isLoading: authLoading } = useAuth();
    const [orders, setOrders] = useState<PaymentHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!session?.token) return;
            setIsLoading(true);
            const { data, error } = await paymentService.getPaymentHistory(session.token);
            if (error) {
                toast.error("Error", { description: error.message });
            } else {
                setOrders(data || []);
            }
            setIsLoading(false);
        };

        if (!authLoading) {
            fetchOrders();
        }
    }, [session?.token, authLoading]);

    const calculateHours = (startTime: string, endTime: string) => {
        const [startHour, startMin] = startTime.split(":").map(Number);
        const [endHour, endMin] = endTime.split(":").map(Number);
        const durationMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
        return (durationMinutes / 60).toFixed(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Order History</h1>
                    <p className="text-muted-foreground mt-2">Manage your tutoring bookings and invoices</p>
                </div>
            </div>

            <Card className="rounded-3xl border-primary/5 shadow-sm overflow-hidden border">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" /> All Orders
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No orders found.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-primary/5">
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] pl-6 whitespace-nowrap">Date</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] whitespace-nowrap">Subject</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] whitespace-nowrap">Tutor Name</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] whitespace-nowrap">Hour</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] whitespace-nowrap">Price</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] whitespace-nowrap">Status</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] whitespace-nowrap">Method</TableHead>
                                    <TableHead className="font-black uppercase tracking-widest text-[10px] pr-6 text-right whitespace-nowrap">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} className="border-primary/5 hover:bg-primary/5 transition-colors group">
                                        <TableCell className="pl-6 font-medium">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold whitespace-nowrap">{format(new Date(order.sessionDate), "dd MMM, yyyy")}</span>
                                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{order.startTime} - {order.endTime}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 text-primary text-[10px] font-bold whitespace-nowrap">
                                                {order.subject}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                                                    {order.tutor.user.image ? (
                                                        <Avatar className="h-8 w-8 border border-primary/10">
                                                            <AvatarImage src={order.tutor.user.image || undefined} />
                                                            <AvatarFallback className="font-bold">
                                                                {order.tutor.user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    ) : (
                                                        <User className="h-3.5 w-3.5 text-primary" />
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold whitespace-nowrap">{order.tutor.user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-bold text-muted-foreground">{calculateHours(order.startTime, order.endTime)} Hrs</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-black text-primary">{formatPrice(order.totalPrice)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "rounded-full px-3 py-0.5 text-[9px] font-black tracking-widest uppercase",
                                                order.paymentStatus === "PAID" ? "bg-green-500" : "bg-yellow-500"
                                            )}>
                                                {order.paymentStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                                                <CreditCard className="h-3 w-3" />
                                                <span>Stripe</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="pr-6 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                                                onClick={() => toast.info("Invoice generation is coming soon!")}
                                            >
                                                <Download className="h-4 w-4" />
                                                <span className="sr-only">Download Invoice</span>
                                            </Button>
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

