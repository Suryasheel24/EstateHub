import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, catchError, of, map, tap } from 'rxjs';
import { PropertyService } from '../../core/services/property.service';
import { Property, SearchCriteria } from '../../core/models/property.model';
import { PropertyCardComponent, SkeletonLoaderComponent, EmptyStateComponent } from '../../shared';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropertyCardComponent,
    SkeletonLoaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  properties: Property[] = [];
  isLoading = true;
  hasError = false;
  viewMode: 'grid' | 'list' = 'grid';
  
  private destroy$ = new Subject<void>();

  propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'house', label: 'House' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'commercial', label: 'Commercial' }
  ];

  sortOptions = [
    { value: 'featured', label: 'Recommended / Featured' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'date_desc', label: 'Newest First' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      // Sync form with URL
      this.filterForm.patchValue({
        transactionType: params['transactionType'] || 'all',
        location: params['location'] || '',
        propertyType: params['propertyType'] || 'all',
        minPrice: params['minPrice'] ? Number(params['minPrice']) : null,
        maxPrice: params['maxPrice'] ? Number(params['maxPrice']) : null,
        bedrooms: params['bedrooms'] ? Number(params['bedrooms']) : null,
        bathrooms: params['bathrooms'] ? Number(params['bathrooms']) : null,
        sortBy: params['sortBy'] || 'featured'
      }, { emitEvent: false }); // Avoid infinite loop

      this.fetchProperties(this.filterForm.value);
    });

    // Listen to form changes and update URL
    this.filterForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.updateUrl(val);
    });
  }

  private initForm() {
    this.filterForm = this.fb.group({
      transactionType: ['all'],
      location: [''],
      propertyType: ['all'],
      minPrice: [null],
      maxPrice: [null],
      bedrooms: [null],
      bathrooms: [null],
      sortBy: ['featured']
    });
  }

  private updateUrl(formValues: any) {
    const queryParams: any = {};
    Object.keys(formValues).forEach(key => {
      if (formValues[key] !== null && formValues[key] !== '' && formValues[key] !== 'all') {
        queryParams[key] = formValues[key];
      }
    });
    this.router.navigate([], { queryParams });
  }

  private fetchProperties(criteria: SearchCriteria) {
    this.isLoading = true;
    this.hasError = false;
    this.propertyService.getProperties(criteria).pipe(
      catchError(err => {
        this.hasError = true;
        return of([]);
      })
    ).subscribe(res => {
      this.properties = res;
      this.isLoading = false;
    });
  }

  resetFilters() {
    this.router.navigate([]); // Clears all query params
  }

  removeFilter(key: string) {
    const val = { ...this.filterForm.value };
    if (key === 'transactionType' || key === 'propertyType') {
      val[key] = 'all';
    } else if (key === 'sortBy') {
      val[key] = 'featured';
    } else {
      val[key] = null;
    }
    this.updateUrl(val);
  }

  get activeFilters() {
    const filters = [];
    const val = this.filterForm.value;
    if (val.location) filters.push({ key: 'location', label: `Location: ${val.location}` });
    if (val.transactionType && val.transactionType !== 'all') filters.push({ key: 'transactionType', label: `For ${val.transactionType}` });
    if (val.propertyType && val.propertyType !== 'all') filters.push({ key: 'propertyType', label: `Type: ${val.propertyType}` });
    if (val.minPrice) filters.push({ key: 'minPrice', label: `Min ₹${this.formatPrice(val.minPrice)}` });
    if (val.maxPrice) filters.push({ key: 'maxPrice', label: `Max ₹${this.formatPrice(val.maxPrice)}` });
    if (val.bedrooms) filters.push({ key: 'bedrooms', label: `${val.bedrooms}+ BHK` });
    if (val.bathrooms) filters.push({ key: 'bathrooms', label: `${val.bathrooms}+ Baths` });
    return filters;
  }

  formatPrice(val: number): string {
    if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${(val / 100000).toFixed(2)} Lac`;
    return val.toLocaleString('en-IN');
  }

  retry() {
    this.fetchProperties(this.filterForm.value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
