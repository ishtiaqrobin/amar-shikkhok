/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";
import {
  PaymentHistoryItem,
  PaymentStats,
  Withdrawal,
  PlatformSetting,
} from "@/types/payment.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface ServiceError {
  message: string;
}

export const paymentService = {
  /**
   * Get payment statistics
   */
  getPaymentStats: async function (
    token: string,
  ): Promise<{ data: PaymentStats | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/payments/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
      });

      const response = await res.json();
      if (!res.ok)
        throw new Error(
          response.message || `HTTP error! status: ${res.status}`,
        );
      return { data: response.data, error: null };
    } catch (err: any) {
      console.error("Error fetching payment stats:", err);
      return {
        data: null,
        error: {
          message: err.message || "Error fetching payment stats",
        },
      };
    }
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async function (token: string): Promise<{
    data: PaymentHistoryItem[] | null;
    error: ServiceError | null;
  }> {
    try {
      const res = await fetch(`${API_URL}/payments/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
      });

      const response = await res.json();
      if (!res.ok)
        throw new Error(
          response.message || `HTTP error! status: ${res.status}`,
        );
      return { data: response.data, error: null };
    } catch (err: any) {
      console.error("Error fetching payment history:", err);
      return {
        data: null,
        error: {
          message: err.message || "Error fetching payment history",
        },
      };
    }
  },

  /**
   * Create withdrawal request
   */
  requestWithdrawal: async function (
    token: string,
    data: { amount: number; notes?: string },
  ): Promise<{ data: Withdrawal | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/payments/withdrawals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      if (!res.ok)
        throw new Error(
          response.message || "Failed to create withdrawal request",
        );
      return { data: response.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  /**
   * Get my withdrawals (Tutor)
   */
  getMyWithdrawals: async function (
    token: string,
  ): Promise<{ data: Withdrawal[] | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/payments/withdrawals/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await res.json();
      if (!res.ok)
        throw new Error(response.message || "Failed to fetch withdrawals");
      return { data: response.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  /**
   * Get all withdrawals (Admin)
   */
  getAllWithdrawals: async function (
    token: string,
    status?: string,
  ): Promise<{ data: Withdrawal[] | null; error: ServiceError | null }> {
    try {
      const url = status
        ? `${API_URL}/payments/withdrawals?status=${status}`
        : `${API_URL}/payments/withdrawals`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await res.json();
      if (!res.ok)
        throw new Error(response.message || "Failed to fetch withdrawals");
      return { data: response.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  /**
   * Update withdrawal status (Admin)
   */
  updateWithdrawalStatus: async function (
    token: string,
    withdrawalId: string,
    data: { status: "APPROVED" | "REJECTED"; transactionId?: string },
  ): Promise<{ data: Withdrawal | null; error: ServiceError | null }> {
    try {
      const res = await fetch(
        `${API_URL}/payments/withdrawals/${withdrawalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );
      const response = await res.json();
      if (!res.ok)
        throw new Error(
          response.message || "Failed to update withdrawal status",
        );
      return { data: response.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  /**
   * Get platform settings (Admin)
   */
  getSettings: async function (
    token: string,
  ): Promise<{ data: PlatformSetting[] | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/settings`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        cache: "no-store",
      });
      const response = await res.json();
      if (!res.ok)
        throw new Error(response.message || "Failed to fetch settings");
      return { data: response.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  /**
   * Update platform setting (Admin)
   */
  updateSetting: async function (
    token: string,
    data: { key: string; value: string },
  ): Promise<{ data: PlatformSetting | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      });
      const response = await res.json();
      if (!res.ok)
        throw new Error(response.message || "Failed to update setting");
      return { data: response.data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },
};
