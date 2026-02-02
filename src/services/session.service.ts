import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;

export const sessionService = {
  /**
   * Get session (Server Side Only)
   */
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok)
        return { data: null, error: { message: "Failed to fetch session" } };

      const session = await res.json();

      if (session === null) {
        return {
          data: null,
          error: {
            message: "No active session",
          },
        };
      }

      return {
        data: session,
        error: null,
      };
    } catch (err) {
      console.error("Error fetching session:", err);
      return {
        data: null,
        error: {
          message: "Error fetching session",
        },
      };
    }
  },
};
