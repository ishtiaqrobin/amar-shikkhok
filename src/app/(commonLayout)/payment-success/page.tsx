"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { bookingService } from "@/services/booking.service";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { session, isLoading: authLoading } = useAuth();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const sessionId = searchParams.get("session_id");
    const bookingId = searchParams.get("booking_id");

    useEffect(() => {
        const verify = async () => {
            if (!authLoading && session?.token && sessionId) {
                const { data, error } = await bookingService.verifyPayment(sessionId, session.token);
                if (error) {
                    toast.error("Verification Error", { description: error.message });
                    setIsSuccess(false);
                } else {
                    setIsSuccess(!!data);
                }
                setIsVerifying(false);
            } else if (!authLoading && !sessionId) {
                setIsVerifying(false);
                router.push("/");
            }
        };

        verify();
    }, [sessionId, session, authLoading, router]);

    return (
        <div className="container mx-auto px-4 py-20 flex justify-center">
            <Card className="max-w-md w-full rounded-3xl border-primary/5 shadow-xl border overflow-hidden">
                <CardHeader className="text-center pt-10 pb-6 bg-primary/5">
                    {isVerifying ? (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-16 w-16 animate-spin text-primary" />
                            <CardTitle className="text-2xl font-black uppercase tracking-widest">Verifying Payment</CardTitle>
                        </div>
                    ) : isSuccess ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl font-black uppercase tracking-widest text-green-600">Payment Successful!</CardTitle>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                                <CheckCircle className="h-12 w-12 text-red-600 rotate-180" />
                            </div>
                            <CardTitle className="text-2xl font-black uppercase tracking-widest text-red-600">Verification Failed</CardTitle>
                        </div>
                    )}
                </CardHeader>
                <CardContent className="pt-8 text-center space-y-6">
                    <p className="text-muted-foreground font-medium">
                        {isVerifying 
                            ? "Please wait while we confirm your transaction with Stripe..." 
                            : isSuccess 
                                ? "Your tutoring session has been confirmed. You can now view it in your dashboard." 
                                : "We couldn't verify your payment. If you've been charged, please contact support."}
                    </p>

                    {!isVerifying && (
                        <div className="flex flex-col gap-3">
                            <Button 
                                onClick={() => router.push("/student-dashboard/bookings")}
                                className="w-full h-12 rounded-full font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                            >
                                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                onClick={() => router.push("/")}
                                className="w-full h-12 rounded-full font-bold uppercase tracking-widest text-xs"
                            >
                                Back to Home
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
