import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() type: 'rent' | 'buy' | 'featured' | string = 'featured';

  get badgeClass() {
    switch (this.type) {
      case 'rent': return 'bg-info text-dark';
      case 'buy': return 'bg-primary text-white';
      case 'featured': return 'bg-warning text-dark';
      default: return 'bg-secondary text-white';
    }
  }
}
