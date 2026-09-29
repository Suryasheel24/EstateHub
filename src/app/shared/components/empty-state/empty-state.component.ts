import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() icon: string = 'bi-search';
  @Input() title: string = 'No Results Found';
  @Input() message: string = 'Try adjusting your filters or search criteria.';
  @Input() actionText: string = '';
  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}
