export interface ReservationItem {
  bookId: string;
  title?: string;
  quantity: number;
}

export interface Reservation {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'ACTIVE';
  dueDate: number;
  createdAt: number;
  reservationDate: number;
  items: ReservationItem[];
}
