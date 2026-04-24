import { env } from "@/env";
import { PaymentHistoryItem, PaymentStats } from "@/types/payment.type";

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

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error fetching payment stats:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching payment stats",
        },
      };
    }
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async function (
    token: string,
  ): Promise<{ data: PaymentHistoryItem[] | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/payments/history`, {
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
      console.error("Error fetching payment history:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error
              ? err.message
              : "Error fetching payment history",
        },
      };
    }
  },
};
