import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  fetchOptions: {
    credentials: "include", // এটি অত্যন্ত গুরুত্বপূর্ণ ক্রস-ডোমেইন কুকির জন্য
  },
  plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
