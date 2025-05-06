import { Event } from "./event";

export interface Voucher {
    id: string;
    code: string;
    claimed: number;
    quota: number;
    amount: number;
    validUntil: number;
    eventId: number;
    events: Event;
  
    createdAt: Date;
    updatedAt: Date;
  }