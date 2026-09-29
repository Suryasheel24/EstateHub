import { Property } from './property.model';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PriceBreakdown {
  bookingToken: number;
  gst: number;
  platformFee: number;
  totalPayable: number;
}

export interface Booking {
  id?: string;
  propertyId: string;
  customerDetails: CustomerDetails | null;
  priceBreakdown: PriceBreakdown | null;
  status: 'draft' | 'pending_payment' | 'confirmed' | 'cancelled';
  reservationDate?: string;
}

export interface BookingState {
  currentProperty: Property | null;
  customerDetails: CustomerDetails | null;
  pricing: PriceBreakdown | null;
  confirmedBooking: Booking | null;
}
