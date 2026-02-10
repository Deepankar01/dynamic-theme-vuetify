export type GuestType = 'adult' | 'child'

export interface Guest {
  id: string
  fullName: string
  type: GuestType
  isPrimary: boolean
}

export interface Booking {
  bookingId: string
  checkinAt: Date
  checkoutAt: Date
  roomCategoryId: string
  guests: Guest[]
  totalGuests: number
}
