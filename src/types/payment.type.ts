export interface PaymentStats {
  totalSpent?: number;
  totalEarnings?: number;
  totalRevenue?: number;
  totalBookings?: number;
  totalSessions?: number;
  totalPayments?: number;
  totalUsers?: number;
  totalTutors?: number;
}

export interface PaymentUser {
  name: string;
  email: string;
  image: string | null;
}

export interface PaymentTutor {
  id: string;
  user: PaymentUser;
}

export interface PaymentHistoryItem {
  id: string;
  studentId: string;
  tutorId: string;
  subject: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
  student: PaymentUser;
  tutor: PaymentTutor;
}
