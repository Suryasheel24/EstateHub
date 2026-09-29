import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property, SearchCriteria } from '../models/property.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private properties: Property[] = [
    {
      id: '1',
      title: 'Signature Villa in Beverly Hills',
      description: 'A stunning modern villa with panoramic city views, an infinity pool, and state-of-the-art smart home features. Enjoy the highest level of privacy and comfort in one of the most exclusive neighborhoods. The open-plan living area seamless integrates with the expansive outdoor deck, creating an unparalleled entertainment space.',
      price: 250000000, // 25 Crores
      transactionType: 'buy',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      imageGallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
        'https://images.unsplash.com/photo-1600607687710-a4d19fc87a71?q=80&w=1200'
      ],
      location: 'Beverly Hills, CA',
      bedrooms: 5,
      bathrooms: 6,
      area: 6500,
      rating: 4.9,
      amenities: ['Pool', 'Wi-Fi', 'Smart Home', 'Gym', 'Cinema', 'Wine Cellar'],
      propertyType: 'villa'
    },
    {
      id: '2',
      title: 'Glass Pavilion Penthouse',
      description: 'Escape to the sky in this charming penthouse featuring a modern fireplace and easy city access. Perfect for a luxury getaway or a summer retreat. The penthouse comes fully furnished with minimalist decor and modern appliances.',
      price: 120000, // 1.2 Lakhs / month rent
      transactionType: 'rent',
      imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
      imageGallery: [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200'
      ],
      location: 'Aspen, CO',
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      rating: 4.7,
      amenities: ['Fireplace', 'Balcony', 'Hot Tub', 'Wi-Fi', 'Heating'],
      propertyType: 'penthouse'
    },
    {
      id: '3',
      title: 'Oceanfront Luxury Estate',
      description: 'Wake up to the sound of waves in this luxurious estate with floor-to-ceiling windows and a private terrace. Enjoy private beach access and resort-style amenities right at your doorstep. The ultimate coastal living experience.',
      price: 45000000, // 4.5 Crores
      transactionType: 'buy',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      imageGallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'
      ],
      location: 'Miami, FL',
      bedrooms: 4,
      bathrooms: 4.5,
      area: 3200,
      rating: 4.8,
      amenities: ['Beach Access', 'Terrace', 'Wi-Fi', 'Pool', 'Concierge'],
      propertyType: 'villa'
    },
    {
      id: '4',
      title: 'Downtown Modern Loft',
      description: 'Industrial-chic loft in the heart of the city, walking distance to top restaurants and nightlife. Features exposed brick walls, high ceilings, and massive windows. Perfect for urban professionals.',
      price: 85000, // 85k / month rent
      transactionType: 'rent',
      imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
      imageGallery: [
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200',
        'https://images.unsplash.com/photo-1502672260266-1c1e52503248?q=80&w=1200',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200'
      ],
      location: 'New York, NY',
      bedrooms: 1,
      bathrooms: 1.5,
      area: 1200,
      rating: 4.6,
      amenities: ['City View', 'Wi-Fi', 'Gym Access', 'Workspace', 'Security'],
      propertyType: 'apartment'
    }
  ];

  constructor() { }

  getProperties(criteria?: SearchCriteria): Observable<Property[]> {
    let filtered = [...this.properties];
    if (criteria) {
      if (criteria.location) {
        filtered = filtered.filter(p => p.location.toLowerCase().includes(criteria.location!.toLowerCase()));
      }
      if (criteria.propertyType && criteria.propertyType !== 'all') {
        filtered = filtered.filter(p => p.propertyType === criteria.propertyType);
      }
      if (criteria.transactionType && criteria.transactionType !== 'all') {
        filtered = filtered.filter(p => p.transactionType === criteria.transactionType);
      }
      if (criteria.bedrooms) {
        filtered = filtered.filter(p => p.bedrooms >= criteria.bedrooms!);
      }
      if (criteria.bathrooms) {
        filtered = filtered.filter(p => p.bathrooms >= criteria.bathrooms!);
      }
      if (criteria.minPrice) {
        filtered = filtered.filter(p => p.price >= criteria.minPrice!);
      }
      if (criteria.maxPrice) {
        filtered = filtered.filter(p => p.price <= criteria.maxPrice!);
      }
      if (criteria.guests) {
        filtered = filtered.filter(p => p.bedrooms * 2 >= criteria.guests!);
      }
      
      // Sorting
      if (criteria.sortBy) {
        switch (criteria.sortBy) {
          case 'price_asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'featured':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'date_desc':
            // we don't have date, so we'll just sort by ID string comparison as a mock
            filtered.sort((a, b) => b.id.localeCompare(a.id));
            break;
        }
      } else {
        // default sort by rating (featured)
        filtered.sort((a, b) => b.rating - a.rating);
      }
    }
    return of(filtered).pipe(delay(500));
  }

  getPropertyById(id: string): Observable<Property | undefined> {
    const property = this.properties.find(p => p.id === id);
    return of(property).pipe(delay(300));
  }

  getFeaturedProperties(): Observable<Property[]> {
    const featured = this.properties.filter(p => p.rating >= 4.7).slice(0, 3);
    return of(featured).pipe(delay(600)); // Simulate loading
  }
}
