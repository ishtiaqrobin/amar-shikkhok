"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AdminBooking } from "@/types/admin.type";
import { format } from "date-fns";
import { Calendar, User, GraduationCap, DollarSign, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface BookingTableProps {
    bookings: AdminBooking[];
}

export function BookingTable({ bookings }: BookingTableProps) {
    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case "CONFIRMED":
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">CONFIRMED</Badge>;
            case "COMPLETED":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">COMPLETED</Badge>;
            case "CANCELLED":
                return <Badge variant="destructive" className="border-none">CANCELLED</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Student & Tutor</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No bookings found
                            </TableCell>
                        </TableRow>
                    ) : (
                        bookings.map((booking) => (
                            <TableRow key={booking.id} className="hover:bg-muted/30 transition-colors">
                                <TableCell>
                                    <code className="text-xs font-mono bg-muted p-1 rounded">
                                        #{booking.id.slice(-6).toUpperCase()}
                                    </code>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <User className="h-3.5 w-3.5 text-blue-500" />
                                            <span className="font-medium">{booking.student?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />
                                            <span className="text-muted-foreground">{booking.tutor?.user?.name}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1 text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(booking.sessionDate), "dd MMM, yyyy")}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {format(new Date(`${booking.sessionDate.split('T')[0]}T${booking.startTime}`), "hh:mm a")} - {format(new Date(`${booking.sessionDate.split('T')[0]}T${booking.endTime}`), "hh:mm a")}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center font-semibold text-sm">
                                        {formatPrice(booking.totalPrice)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(booking.status)}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
