export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TUTORS: "/tutors",
  CATEGORIES: "/categories",
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOGS: "/blogs",

  STUDENT: {
    DASHBOARD: "/student-dashboard",
    BOOKINGS: "/student-dashboard/bookings",
    PROFILE: "/student-dashboard/profile",
  },

  TUTOR: {
    DASHBOARD: "/tutor-dashboard",
    AVAILABILITY: "/tutor-dashboard/availability",
    BOOKINGS: "/tutor-dashboard/bookings",
    PROFILE: "/tutor-dashboard/profile",
  },

  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    BOOKINGS: "/admin/bookings",
    CATEGORIES: "/admin/categories",
  },
} as const;
