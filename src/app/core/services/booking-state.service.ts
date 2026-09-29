import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Property } from '../models/property.model';
import { BookingState, CustomerDetails, PriceBreakdown, Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {
  private readonly STATE_KEY = 'estatehub_booking_state';

  private defaultState: BookingState = {
    currentProperty: null,
    customerDetails: null,
    pricing: null,
    confirmedBooking: null
  };

  private state = new BehaviorSubject<BookingState>(this.defaultState);
  state$ = this.state.asObservable();

  constructor() {
    this.loadState();
  }

  get currentState(): BookingState {
    return this.state.getValue();
  }

  initBooking(property: Property): void {
    const pricing = this.calculatePricing(property);
    const newState = {
      ...this.currentState,
      currentProperty: property,
      pricing,
      // If we are booking a new property, don't clear customer details so it auto-fills,
      // but clear confirmedBooking
      confirmedBooking: null
    };
    this.updateState(newState);
  }

  saveCustomerDetails(details: CustomerDetails): void {
    this.updateState({
      ...this.currentState,
      customerDetails: details
    });
  }

  confirmBooking(): Booking {
    const state = this.currentState;
    if (!state.currentProperty || !state.customerDetails || !state.pricing) {
      throw new Error('Cannot confirm booking: missing required state.');
    }

    const bookingId = `EH-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const confirmedBooking: Booking = {
      id: bookingId,
      propertyId: state.currentProperty.id,
      customerDetails: state.customerDetails,
      priceBreakdown: state.pricing,
      status: 'confirmed',
      reservationDate: new Date().toISOString()
    };

    this.updateState({
      ...state,
      confirmedBooking
    });

    return confirmedBooking;
  }

  resetBooking(): void {
    this.updateState(this.defaultState);
  }

  private calculatePricing(property: Property): PriceBreakdown {
    // Requirements:
    // Base Token/Booking Fee: e.g. Fixed at 1,00,000 for Buy, or 1 month for Rent.
    // Let's use 100,000 as token for simplicity, or 1 month rent if rent.
    const bookingToken = property.transactionType === 'buy' ? 100000 : property.price;
    const platformFee = 2500;
    const gst = (bookingToken + platformFee) * 0.18; // 18% GST on booking fee + platform fee
    const totalPayable = bookingToken + platformFee + gst;

    return {
      bookingToken,
      platformFee,
      gst,
      totalPayable
    };
  }

  private updateState(newState: BookingState): void {
    this.state.next(newState);
    sessionStorage.setItem(this.STATE_KEY, JSON.stringify(newState));
  }

  private loadState(): void {
    const saved = sessionStorage.getItem(this.STATE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state.next(parsed);
      } catch (e) {
        console.error('Failed to parse booking state from storage', e);
      }
    }
  }
}
