import { TransactionDetail } from "./transaction";

export interface Ticket {
    id: number;
    type: string;
    sold: number;
    availableSeats: number;
    price: number;
    eventId: number;
    createdAt: Date; // atau string jika kamu menerima dari API sebagai ISO string
    updatedAt: Date; // atau string
    deletedAt: Date | null; // bisa null jika belum dihapus
    transaction_details: TransactionDetail[]; // atau hanya ID transaksi jika tidak selalu dibutuhkan
  };