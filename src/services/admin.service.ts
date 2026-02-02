import { env } from "@/env";
import { AdminStats, AdminUser, AdminBooking } from "@/types/admin.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

export const adminService = {
  /**
   * Get dashboard statistics
   */
  getStats: async function (
    token: string,
  ): Promise<{ data: AdminStats | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
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
      console.error("Error fetching admin stats:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching admin stats",
        },
      };
    }
  },

  /**
   * Get all users
   */
  getAllUsers: async function (
    token: string,
    role?: string,
  ): Promise<{ data: AdminUser[] | null; error: ServiceError | null }> {
    try {
      const url = role
        ? `${API_URL}/admin/users?role=${role}`
        : `${API_URL}/admin/users`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
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
      console.error("Error fetching users:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Error fetching users",
        },
      };
    }
  },

  /**
   * Ban user
   */
  banUser: async function (
    token: string,
    userId: string,
  ): Promise<{ data: AdminUser | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}/ban`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
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
      console.error("Error banning user:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Error banning user",
        },
      };
    }
  },

  /**
   * Unban user
   */
  unbanUser: async function (
    token: string,
    userId: string,
  ): Promise<{ data: AdminUser | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}/unban`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
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
      console.error("Error unbanning user:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Error unbanning user",
        },
      };
    }
  },

  /**
   * Get all bookings
   */
  getAllBookings: async function (
    token: string,
  ): Promise<{ data: AdminBooking[] | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
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
      console.error("Error fetching all bookings:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching all bookings",
        },
      };
    }
  },
};
