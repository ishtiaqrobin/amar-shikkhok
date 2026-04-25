import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: window.location.origin, // এটি অটোমেটিক আপনার ফ্রন্টেন্ড ডোমেইন নিয়ে নেবে
  plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
