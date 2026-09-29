import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil, switchMap, of, tap } from 'rxjs';
import { BookingStateService } from '../../core/services/booking-state.service';
import { PropertyService } from '../../core/services/property.service';
import { BookingState } from '../../core/models/booking.model';
import { BookingStepperComponent } from '../../shared';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, BookingStepperComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  state: BookingState | null = null;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingState: BookingStateService,
    private propertyService: PropertyService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.bookingState.state$.pipe(takeUntil(this.destroy$)).subscribe(s => {
      this.state = s;
      if (s.customerDetails) {
        this.checkoutForm.patchValue(s.customerDetails);
      }
    });

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/properties']);
          return of(null);
        }
        
        // If state already has this property, we are good. Otherwise fetch it and init.
        if (this.state?.currentProperty?.id === id) {
          this.isLoading = false;
          return of(null);
        } else {
          this.isLoading = true;
          return this.propertyService.getPropertyById(id).pipe(
            tap(prop => {
              if (prop) {
                this.bookingState.initBooking(prop);
              } else {
                this.router.navigate(['/properties']);
              }
              this.isLoading = false;
            })
          );
        }
      })
    ).subscribe();
  }

  private initForm() {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      agreed: [false, Validators.requiredTrue]
    });
  }

  formatPrice(val?: number): string {
    if (val === undefined || val === null) return '';
    return `₹${val.toLocaleString('en-IN')}`;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const { agreed, ...details } = this.checkoutForm.value;
    this.bookingState.saveCustomerDetails(details);
    
    if (this.state?.currentProperty?.id) {
      this.router.navigate(['/review', this.state.currentProperty.id]);
    }
  }

  get property() { return this.state!.currentProperty!; }
  get pricing() { return this.state!.pricing!; }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
