import { env } from "@/env";
import { User } from "@/types/tutor.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface ServiceError {
  message: string;
}

export const userService = {
  getMe: async function (
    token: string,
  ): Promise<{ data: User | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching profile",
        },
      };
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async function (
    token: string,
    payload: { name?: string; phone?: string; image?: string },
  ): Promise<{ data: User | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`,
        );
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error updating profile:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error updating profile",
        },
      };
    }
  },
};
