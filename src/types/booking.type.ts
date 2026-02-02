export enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
}

export interface Tutor {
  id: string;
  userId: string;
  user: User;
  hourlyRate: number;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  subject: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  notes?: string | null;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  student?: User;
  tutor?: Tutor;
}

export interface CreateBookingInput {
  tutorId: string;
  subject: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  notes?: string;
  totalPrice: number;
}

export interface BookingsResponse {
  data: Booking[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
