import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Property } from '../../../core/models/property.model';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
  @Input({ required: true }) property!: Property;

  get formattedPrice(): string {
    if (!this.property) return '';
    const val = this.property.price;
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lac`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  }
}
