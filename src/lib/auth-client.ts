import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  fetchOptions: {
    credentials: "include",
  },
  // discovery: true, // এটি অনেক সময় সেশন খুঁজে পেতে সাহায্য করে
  plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
