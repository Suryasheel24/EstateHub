import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchControllerComponent } from './components/search-controller/search-controller.component';
import { PropertyCardComponent, SkeletonLoaderComponent, EmptyStateComponent } from '../../shared';
import { PropertyService } from '../../core/services/property.service';
import { Property } from '../../core/models/property.model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchControllerComponent,
    PropertyCardComponent,
    SkeletonLoaderComponent,
    EmptyStateComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProperties$!: Observable<Property[]>;

  popularLocations = [
    { name: 'Noida', count: '1,240+ Properties', query: 'Noida', image: 'https://images.unsplash.com/photo-1587572236558-a3751c6d42c0?q=80&w=600&auto=format&fit=crop' },
    { name: 'Gurugram', count: '2,100+ Properties', query: 'Gurugram', image: 'https://images.unsplash.com/photo-1595964270729-3877dc65f4d4?q=80&w=600&auto=format&fit=crop' },
    { name: 'Mumbai', count: '3,850+ Properties', query: 'Mumbai', image: 'https://images.unsplash.com/photo-1529253355956-4279092d6e6a?q=80&w=600&auto=format&fit=crop' },
    { name: 'Delhi', count: '1,950+ Properties', query: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600&auto=format&fit=crop' },
    { name: 'Bengaluru', count: '4,100+ Properties', query: 'Bengaluru', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop' }
  ];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.featuredProperties$ = this.propertyService.getFeaturedProperties();
  }
}
