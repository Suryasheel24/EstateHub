import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex justify-content-center align-items-center mb-5">
      
      <div class="d-flex flex-column align-items-center position-relative z-1">
        <div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm fw-bold mb-2" 
             [ngClass]="activeStep >= 1 ? 'bg-primary text-white' : 'bg-white text-muted border'"
             style="width: 40px; height: 40px;">
             <i class="bi bi-check-lg fs-5" *ngIf="activeStep > 1"></i>
             <span *ngIf="activeStep <= 1">1</span>
        </div>
        <span class="small fw-medium" [ngClass]="activeStep >= 1 ? 'text-primary' : 'text-muted'">Details & Billing</span>
      </div>

      <div class="flex-grow-1 border-top border-2 mx-3 position-relative" style="top: -10px;" [ngClass]="activeStep >= 2 ? 'border-primary' : 'border-light'"></div>

      <div class="d-flex flex-column align-items-center position-relative z-1">
        <div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm fw-bold mb-2" 
             [ngClass]="activeStep >= 2 ? 'bg-primary text-white' : 'bg-white text-muted border'"
             style="width: 40px; height: 40px;">
             <i class="bi bi-check-lg fs-5" *ngIf="activeStep > 2"></i>
             <span *ngIf="activeStep <= 2">2</span>
        </div>
        <span class="small fw-medium" [ngClass]="activeStep >= 2 ? 'text-primary' : 'text-muted'">Review Booking</span>
      </div>

      <div class="flex-grow-1 border-top border-2 mx-3 position-relative" style="top: -10px;" [ngClass]="activeStep >= 3 ? 'border-primary' : 'border-light'"></div>

      <div class="d-flex flex-column align-items-center position-relative z-1">
        <div class="rounded-circle d-flex align-items-center justify-content-center shadow-sm fw-bold mb-2" 
             [ngClass]="activeStep >= 3 ? 'bg-primary text-white' : 'bg-white text-muted border'"
             style="width: 40px; height: 40px;">
             3
        </div>
        <span class="small fw-medium" [ngClass]="activeStep >= 3 ? 'text-primary' : 'text-muted'">Confirmation</span>
      </div>

    </div>
  `
})
export class BookingStepperComponent {
  @Input() activeStep: number = 1;
}
