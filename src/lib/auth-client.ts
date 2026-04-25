import {
  emailOTPClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import type { Auth } from "../../../Backend/src/app/lib/auth";
import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [emailOTPClient(), inferAdditionalFields<Auth>()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
