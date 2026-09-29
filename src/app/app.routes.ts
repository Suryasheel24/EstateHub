import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { PropertiesComponent } from './features/properties/properties.component';
import { PropertyDetailComponent } from './features/property-detail/property-detail.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ReviewComponent } from './features/review/review.component';
import { ConfirmationComponent } from './features/confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: '**', redirectTo: '' }
];
