export interface User {
  id: number;
  email: string;
  password: string;
  profilePict?: string | null;
  role: string;
  bankAccount?: number | null;
  bankName?: string | null;
  phoneNumber?: number | null;
  fullName: string;
  referralCode?: string | null;
}
