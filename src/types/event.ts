import { Transaction } from "./transaction"
import { User } from "./user"

export interface Event {
    id: number
    name: string
    locationDetail: string
    description: string
    thumbnail: string
    startDate: string
    endDate: string
    slug: string
    category: string
    userId: number
    createdAt: string
    updatedAt: string
    deletedAt: null | string
    transactions?: Transaction[]
    users?: User
    reviews?: any[]
  }
  
  export interface EventOrganizer {
    
  }