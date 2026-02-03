import { env } from "@/env";
import {
  GetTutorsParams,
  TutorsResponse,
  TutorStats,
  Tutor,
  Availability,
} from "@/types/tutor.type";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface ServiceError {
  message: string;
}

export const tutorsService = {
  /**
   * Get list of tutors with optional filters
   */
  getTutors: async function (
    params?: GetTutorsParams,
    options?: ServiceOptions,
  ): Promise<{ data: TutorsResponse | null; error: ServiceError | null }> {
    try {
      const url = new URL(`${API_URL}/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();

      // Map categories to category (singular) and availabilities to availability
      if (json.data && Array.isArray(json.data)) {
        json.data = json.data.map((tutor: Tutor) => ({
          ...tutor,
          category: tutor.categories?.[0] || null,
          availability: tutor.availabilities || tutor.availability || [],
        }));
      }

      return { data: json, error: null };
    } catch (err) {
      console.error("Error fetching tutors:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Error fetching tutors",
        },
      };
    }
  },

  /**
   * Get single tutor by ID
   */
  getTutorById: async function (
    tutorId: string,
    options?: ServiceOptions,
  ): Promise<{ data: Tutor | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/tutors/${tutorId}`;

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url, config);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      const tutor = response.data;

      // Map categories to category (singular) and availabilities to availability
      if (tutor) {
        tutor.category = tutor.categories?.[0] || null;
        tutor.availability = tutor.availabilities || tutor.availability || [];
      }

      return { data: tutor, error: null };
    } catch (err) {
      console.error("Error fetching tutor:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Error fetching tutor",
        },
      };
    }
  },

  /**
   * Get tutor dashboard stats
   */
  getStats: async function (
    token: string,
  ): Promise<{ data: TutorStats | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/tutor/stats`;

      const res = await fetch(url, {
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
      console.error("Error fetching tutor stats:", err);
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Error fetching stats",
        },
      };
    }
  },

  /**
   * Update tutor profile
   */
  updateProfile: async function (
    token: string,
    payload: Partial<Tutor> & { categoryIds?: string[] },
  ): Promise<{ data: Tutor | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/tutor/profile`;

      const res = await fetch(url, {
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

  /**
   * Create tutor profile
   */
  createProfile: async function (
    token: string,
    payload: Partial<Tutor> & { categoryIds?: string[] },
  ): Promise<{ data: Tutor | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/tutor/profile`;

      const res = await fetch(url, {
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
      console.error("Error creating profile:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error creating profile",
        },
      };
    }
  },

  /**
   * Add availability
   */
  addAvailability: async function (
    token: string,
    payload: Omit<Availability, "id" | "tutorId">,
  ): Promise<{ data: Availability | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/tutor/availability`;

      const res = await fetch(url, {
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
      console.error("Error adding availability:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error adding availability",
        },
      };
    }
  },

  /**
   * Update availability
   */
  updateAvailability: async function (
    token: string,
    payload: Partial<Availability> & { dayOfWeek: string },
  ): Promise<{ data: Availability | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/tutor/availability`;

      const res = await fetch(url, {
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
      console.error("Error updating availability:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error updating availability",
        },
      };
    }
  },

  /**
   * Get availability
   */
  getAvailability: async function (
    token: string,
  ): Promise<{ data: Availability[] | null; error: ServiceError | null }> {
    try {
      const url = `${API_URL}/tutor/availability`;

      const res = await fetch(url, {
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
      console.error("Error fetching availability:", err);
      return {
        data: null,
        error: {
          message:
            err instanceof Error ? err.message : "Error fetching availability",
        },
      };
    }
  },
};
