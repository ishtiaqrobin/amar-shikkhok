import { env } from "@/env";

const API_URL = env.API_URL;

//* No Dynamic and No {cache: no-store} : SSG -> Static Page
//* {cache: no-store} : SSR -> Server Side Rendered Page
//* {next: {revalidate: 10}} : ISR -> Mixed between static and dynamic

// ✅ Default (no dynamic API, no no-store, no revalidate)
// → SSG (Static Site Generation)
// → Build time এ একবার HTML generate হয়
// → CDN/cache থেকে serve হয়

// ✅ { cache: "no-store" }
// → SSR (Server Side Rendering / Dynamic Rendering)
// → Every request এ server run হয়
// → Always fresh data

// ✅ { next: { revalidate: 10 } }
// → ISR (Incremental Static Regeneration)
// → First build এ static
// → 10s পর next request এ background re-generate

// ⚠️ These ALSO force SSR automatically:
// cookies(), headers(), searchParams, dynamic = "force-dynamic"

interface GetTutorsParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const tutorsService = {
  getTutors: async function (
    params?: GetTutorsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`http://localhost:5000/api/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
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

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err + "Error fetching blog posts",
        },
      };
    }
  },
};
