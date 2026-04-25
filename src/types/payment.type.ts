export interface PaymentStats {
  totalSpent?: number;
  totalEarnings?: number;
  totalRevenue?: number;
  totalBookings?: number;
  totalSessions?: number;
  totalPayments?: number;
  totalUsers?: number;
  totalTutors?: number;
  withdrawableBalance?: number;
}

export interface Withdrawal {
  id: string;
  tutorId: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  method: string;
  transactionId: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  tutor: {
    user: {
      name: string;
      email: string;
    };
  };
}

export interface PlatformSetting {
  id: string;
  key: string;
  value: string;
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
