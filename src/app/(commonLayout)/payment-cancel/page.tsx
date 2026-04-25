"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Loader2 } from "lucide-react";

function PaymentCancelContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("booking_id");

    return (
        <Card className="max-w-md w-full rounded-3xl border-primary/5 shadow-xl border overflow-hidden">
            <CardHeader className="text-center pt-10 pb-6 bg-red-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="h-12 w-12 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-black uppercase tracking-widest text-red-600">Payment Cancelled</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-8 text-center space-y-6">
                <p className="text-muted-foreground font-medium">
                    Your payment process was cancelled. No charges were made.
                    Your booking is still saved as <b>Pending</b> in your dashboard.
                </p>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => router.push("/student-dashboard/bookings")}
                        className="w-full h-12 rounded-full font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> View My Bookings
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/")}
                        className="w-full h-12 rounded-full font-bold uppercase tracking-widest text-xs"
                    >
                        Back to Home
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function PaymentCancelPage() {
    return (
        <div className="container mx-auto px-4 py-20 flex justify-center">
            <Suspense fallback={
                <Card className="max-w-md w-full rounded-3xl border-primary/5 shadow-xl border overflow-hidden">
                    <CardHeader className="text-center pt-10 pb-6 bg-red-50">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-12 w-12 animate-spin text-red-600" />
                            <CardTitle className="text-2xl font-black uppercase tracking-widest text-red-600">Loading...</CardTitle>
                        </div>
                    </CardHeader>
                </Card>
            }>
                <PaymentCancelContent />
            </Suspense>
        </div>
    );
}

