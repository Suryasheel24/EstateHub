import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BookingStateService } from '../../core/services/booking-state.service';
import { BookingState } from '../../core/models/booking.model';
import { BookingStepperComponent } from '../../shared';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, BookingStepperComponent, DatePipe],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  state!: BookingState;

  constructor(
    private router: Router,
    private bookingState: BookingStateService
  ) {}

  ngOnInit() {
    this.state = this.bookingState.currentState;

    if (!this.state.confirmedBooking) {
      this.router.navigate(['/properties']);
    }
  }

  formatPrice(val?: number): string {
    if (val === undefined || val === null) return '';
    return `₹${val.toLocaleString('en-IN')}`;
  }

  downloadReceipt() {
    alert('Mock PDF Receipt Download Triggered!');
  }

  exploreMore() {
    this.bookingState.resetBooking();
    this.router.navigate(['/properties']);
  }

  get property() { return this.state.currentProperty!; }
  get customer() { return this.state.customerDetails!; }
  get pricing() { return this.state.pricing!; }
  get booking() { return this.state.confirmedBooking!; }
}
