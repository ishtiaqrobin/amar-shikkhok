"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Chrome } from "lucide-react";

interface GoogleAuthButtonProps {
    mode?: "login" | "signup";
    className?: string;
}

export function GoogleAuthButton({
    mode = "login",
    className
}: GoogleAuthButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleAuth = async () => {
        setIsLoading(true);

        try {
            await authClient.signIn.social({
                provider: "google",
                // callbackURL must be on the FRONTEND origin so the session
                // cookie (set via Next.js rewrite proxy) is accessible.
                // Never hardcode localhost — use the env variable.
                callbackURL: `${env.NEXT_PUBLIC_APP_URL}/student-dashboard`,
            });
        } catch (error) {
            console.error("Google auth error:", error);
            toast.error(`Google ${mode} failed`);
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            className={className || "w-full"}
            onClick={handleGoogleAuth}
            disabled={isLoading}
            type="button"
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Chrome className="mr-2 h-4 w-4" />
            )}
            {mode === "login" ? "Login" : "Sign up"} with Google
        </Button>
    );
}
