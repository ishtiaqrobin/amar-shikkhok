import { env } from "@/env";
import type {
  GetTutorsParams,
  Tutor,
  TutorsResponse,
} from "@/types/tutor.type";

const API_URL = env.API_URL;

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

      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }

      const data = await res.json();

      return { data: data, error: null };
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

      return { data: response.data, error: null };
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
};
