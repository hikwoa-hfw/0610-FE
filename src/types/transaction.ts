import { Ticket } from "./ticket";
import { User } from "./user";
import { Voucher } from "./voucher";
import { Event } from "./event";

export interface Transaction {
  id: number;
  uuid: string;
  status: string;
  paymentProof: string | null;
  pointAmount: number;
  voucherAmount: number;
  couponAmount: number;
  totalPrice: number 
  voucherId: string | null;
  couponId: string | null;
  userId: number;
  eventId: number;
  createdAt: string 
  updatedAt: string 
  deletedAt: string | Date | null;
  users: User;
  transaction_details?: TransactionDetail[];
  vouchers: Voucher
  events: Event
}

export interface TransactionRevenue {
  _sum: {totalPrice: number}
}

export interface TransactionDetail {
  id: number;
  uuid: string;
  name: string;
  qty: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  transactionId: number;
  ticketId: number;
  deletedAt: null | string;
  tickets: Ticket
}
