import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingStateService } from '../../core/services/booking-state.service';
import { BookingState } from '../../core/models/booking.model';
import { BookingStepperComponent } from '../../shared';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, BookingStepperComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  state!: BookingState;

  constructor(
    private router: Router,
    private bookingState: BookingStateService
  ) {}

  ngOnInit() {
    this.state = this.bookingState.currentState;
    
    // Redirect if state is incomplete
    if (!this.state.currentProperty || !this.state.customerDetails || !this.state.pricing) {
      if (this.state.currentProperty?.id) {
        this.router.navigate(['/checkout', this.state.currentProperty.id]);
      } else {
        this.router.navigate(['/properties']);
      }
    }
  }

  formatPrice(val?: number): string {
    if (val === undefined || val === null) return '';
    return `₹${val.toLocaleString('en-IN')}`;
  }

  goBack() {
    this.router.navigate(['/checkout', this.state.currentProperty!.id]);
  }

  confirmAndReserve() {
    try {
      const booking = this.bookingState.confirmBooking();
      this.router.navigate(['/confirmation', booking.id]);
    } catch (e) {
      console.error(e);
      alert('Error confirming booking.');
    }
  }

  get property() { return this.state.currentProperty!; }
  get customer() { return this.state.customerDetails!; }
  get pricing() { return this.state.pricing!; }
}
