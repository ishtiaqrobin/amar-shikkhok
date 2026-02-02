export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    SESSION: "/auth/get-session",
    LOGOUT: "/auth/logout",
  },
  USERS: {
    ME: "/users/me",
    PROFILE: "/users/profile",
    STATS: "/users/stats",
  },
  TUTORS: {
    LIST: "/tutors",
    DETAILS: (id: string) => `/tutors/${id}`,
    PROFILE: "/tutors/profile",
    AVAILABILITY: "/tutors/availability",
    STATS: "/tutors/stats",
  },
  CATEGORIES: {
    LIST: "/categories",
    CREATE: "/categories",
    DELETE: (id: string) => `/categories/${id}`,
  },
  BOOKINGS: {
    CREATE: "/bookings",
    MY_BOOKINGS: "/bookings/my-bookings",
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
    COMPLETE: (id: string) => `/bookings/${id}/complete`,
  },
  REVIEWS: {
    CREATE: "/reviews",
    TUTOR_REVIEWS: (id: string) => `/reviews/tutor/${id}`,
  },
  ADMIN: {
    USERS: "/admin/users",
    BAN_USER: (id: string) => `/admin/users/${id}/ban`,
    UNBAN_USER: (id: string) => `/admin/users/${id}/unban`,
    BOOKINGS: "/admin/bookings",
    STATS: "/admin/stats",
  },
} as const;
