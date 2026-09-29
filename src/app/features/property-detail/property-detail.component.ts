import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap, catchError, of, tap, map } from 'rxjs';
import { PropertyService } from '../../core/services/property.service';
import { Property } from '../../core/models/property.model';
import { PropertyCardComponent, SkeletonLoaderComponent, EmptyStateComponent, BadgeComponent } from '../../shared';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    PropertyCardComponent, 
    SkeletonLoaderComponent, 
    EmptyStateComponent,
    BadgeComponent
  ],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  isLoading = true;
  hasError = false;
  activeImage = '';
  
  similarProperties$: Observable<Property[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      tap(() => {
        this.isLoading = true;
        this.hasError = false;
        this.property = null;
      }),
      switchMap(params => {
        const id = params.get('id');
        if (!id) throw new Error('No ID');
        return this.propertyService.getPropertyById(id);
      }),
      catchError(err => {
        this.hasError = true;
        this.isLoading = false;
        return of(undefined);
      })
    ).subscribe(prop => {
      if (prop) {
        this.property = prop;
        this.activeImage = prop.imageUrl;
        this.loadSimilarProperties(prop);
      } else {
        this.hasError = true;
      }
      this.isLoading = false;
    });
  }

  setActiveImage(img: string) {
    this.activeImage = img;
  }

  loadSimilarProperties(prop: Property) {
    // In a real app we'd pass { propertyType: prop.propertyType } etc.
    this.similarProperties$ = this.propertyService.getProperties({ propertyType: prop.propertyType as any }).pipe(
      map(props => props.filter(p => p.id !== prop.id).slice(0, 3))
    );
  }

  formatPrice(val: number): string {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lac`;
    return `₹${val.toLocaleString('en-IN')}`;
  }

  getBookingTokenAmount(): number {
    return 100000; // Mock fixed token amount
  }

  bookNow() {
    if (this.property) {
      this.router.navigate(['/checkout', this.property.id]);
    }
  }

  goBack() {
    this.router.navigate(['/properties']);
  }
}
