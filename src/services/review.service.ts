import { env } from "@/env";
import { Review } from "@/types/tutor.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

export interface ServiceError {
  message: string;
}

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment?: string;
}

export const reviewService = {
  /**
   * Create a new review
   */
  createReview: async function (
    token: string,
    payload: CreateReviewPayload,
  ): Promise<{ data: Review | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
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
      console.error("Error creating review:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Error creating review",
        },
      };
    }
  },

  /**
   * Get reviews for a specific tutor
   */
  getTutorReviews: async function (
    tutorId: string,
  ): Promise<{ data: Review[] | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/reviews/tutor/${tutorId}`, {
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
      console.error("Error fetching tutor reviews:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching tutor reviews",
        },
      };
    }
  },
  /**
   * Get all reviews (Public, latest first)
   */
  getAllReviews: async function (
    limit: number = 10,
  ): Promise<{ data: Review[] | null; error: ServiceError | null }> {
    try {
      const res = await fetch(`${API_URL}/reviews?limit=${limit}`, {
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
      console.error("Error fetching all reviews:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching all reviews",
        },
      };
    }
  },
};
