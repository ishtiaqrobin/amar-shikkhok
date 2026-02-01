export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  phone?: string | null;
  isActive?: boolean;
  isBanned?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
}

export interface Availability {
  id: string;
  tutorId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Review {
  id: string;
  studentId: string;
  tutorId: string;
  bookingId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  student: User;
}

export interface Tutor {
  id: string;
  userId: string;
  user: User;
  bio?: string | null;
  expertise: string[];
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  categoryId?: string | null;
  category?: Category | null;
  availability?: Availability[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface TutorListItem {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    phone?: string | null;
  };
  bio?: string | null;
  expertise: string[];
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  category?: {
    id: string;
    name: string;
  } | null;
}

export interface GetTutorsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  minRate?: number;
  maxRate?: number;
  minRating?: number;
}

export interface TutorsResponse {
  data: TutorListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
