import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL
//     ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth`
//     : "http://localhost:5000/api/auth",
// });

// export const { signIn, signUp, signOut, useSession } = authClient;
