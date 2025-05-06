export interface User {
  id: number;
  email: string;
  password: string;
  profilePict?: string | null
  role: string;
  bankAccount?: string | null;
  bankName?: string | null;
  phoneNumber?: string | null;
  fullName: string;
  referralCode?: string | null;
}
