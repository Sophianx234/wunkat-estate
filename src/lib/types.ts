export interface Room {
  id: string
  title: string
  description: string
  price: number
  location: string
  beds: number
  baths: number
  amenities: string[]
  images: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  userId: string
  roomId: string
  checkIn: Date
  checkOut: Date
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  paymentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  bookings: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  roomId: string
  userId: string
  rating: number
  comment: string
  createdAt: Date
}
