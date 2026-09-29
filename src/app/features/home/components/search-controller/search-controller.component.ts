import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-controller',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-controller.component.html',
  styleUrl: './search-controller.component.scss'
})
export class SearchControllerComponent implements OnInit {
  searchForm!: FormGroup;
  activeTab: 'buy' | 'rent' = 'buy';
  
  locations = ['Noida', 'Delhi', 'Gurugram', 'Mumbai', 'Beverly Hills', 'Miami', 'Aspen', 'New York'];
  propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'house', label: 'House' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'cabin', label: 'Cabin' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      location: [''],
      propertyType: [''],
      budget: [''],
      bedrooms: ['']
    });
  }

  setTab(tab: 'buy' | 'rent') {
    this.activeTab = tab;
    // Reset budget when switching context
    this.searchForm.patchValue({ budget: '' });
  }

  get budgetOptions() {
    if (this.activeTab === 'buy') {
      return [
        { value: '5000000', label: 'Under ₹50 Lacs' },
        { value: '10000000', label: 'Under ₹1 Cr' },
        { value: '50000000', label: 'Under ₹5 Cr' },
        { value: '100000000', label: 'Under ₹10 Cr' }
      ];
    } else {
      return [
        { value: '20000', label: 'Under ₹20,000/mo' },
        { value: '50000', label: 'Under ₹50,000/mo' },
        { value: '100000', label: 'Under ₹1 Lac/mo' },
        { value: '200000', label: 'Under ₹2 Lacs/mo' }
      ];
    }
  }

  onSearch() {
    const formValues = this.searchForm.value;
    
    // Build queryParams carefully
    const queryParams: any = { transactionType: this.activeTab };
    if (formValues.location) queryParams.location = formValues.location;
    if (formValues.propertyType) queryParams.propertyType = formValues.propertyType;
    if (formValues.budget) queryParams.maxPrice = formValues.budget;
    if (formValues.bedrooms) queryParams.bedrooms = formValues.bedrooms;

    this.router.navigate(['/properties'], { queryParams });
  }
}
