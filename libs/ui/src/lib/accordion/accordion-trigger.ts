import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'neo-accordion-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 class="flex">
      <button
        type="button"
        [attr.aria-expanded]="open"
        [class]="triggerClasses"
      >
        <ng-content />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          [class]="chevronClasses"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  `,
})
export class NbAccordionTriggerComponent {
  @Input() open = false;

  get triggerClasses(): string {
    return [
      'flex flex-1 items-center justify-between',
      'text-left text-base font-heading text-main-foreground',
      'bg-main p-4 transition-all',
      'focus-visible:ring-[3px] focus-visible:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      this.open ? 'rounded-b-none border-b-2 border-border' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get chevronClasses(): string {
    return [
      'pointer-events-none size-5 shrink-0 transition-transform duration-200',
      this.open ? 'rotate-180' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}