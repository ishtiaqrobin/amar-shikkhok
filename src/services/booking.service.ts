import { env } from "@/env";
import type { Booking, CreateBookingInput } from "@/types/booking.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface ServiceError {
  message: string;
}

export const bookingService = {
  /**
   * Get my bookings (student or tutor)
   */
  getMyBookings: async function (
    token: string,
    status?: string,
  ): Promise<{ data: Booking[] | null; error: ServiceError | null }> {
    try {
      const url = new URL(`${API_URL}/bookings`);
      if (status) {
        url.searchParams.append("status", status);
      }

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error fetching bookings:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching bookings",
        },
      };
    }
  },

  /**
   * Get single booking by ID
   */
  getBookingById: async function (
    bookingId: string,
    token: string,
  ): Promise<{ data: Booking | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/bookings/${bookingId}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error fetching booking:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching booking",
        },
      };
    }
  },

  /**
   * Create new booking
   */
  createBooking: async function (
    data: CreateBookingInput,
    token: string,
  ): Promise<{ data: Booking | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error creating booking:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error creating booking",
        },
      };
    }
  },

  /**
   * Cancel booking (student only)
   */
  cancelBooking: async function (
    bookingId: string,
    token: string,
  ): Promise<{ data: Booking | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error cancelling booking:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error cancelling booking",
        },
      };
    }
  },

  /**
   * Complete booking (tutor only)
   */
  completeBooking: async function (
    bookingId: string,
    token: string,
  ): Promise<{ data: Booking | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/complete`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error("Error completing booking:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error completing booking",
        },
      };
    }
  },
};
