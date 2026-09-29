export type PropertyType = 'house' | 'apartment' | 'villa' | 'cabin' | 'penthouse';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number; // changed from pricePerNight to price
  transactionType: 'buy' | 'rent';
  imageUrl: string;
  imageGallery?: string[];
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  rating: number;
  amenities: string[];
  propertyType: PropertyType;
  balconies?: number;
  furnishingStatus?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  floorLevel?: string;
  facingDirection?: string;
}

export interface SearchCriteria {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  propertyType?: string; // widened from PropertyType to support multiple or 'all'
  transactionType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy?: 'featured' | 'price_asc' | 'price_desc' | 'date_desc';
}
