import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NB_SELECT, type NbSelectValue } from './select.types';

let nextSelectOptionId = 0;

@Component({
  selector: 'nb-select-option',
  template: `
    <button
      #button
      type="button"
      role="option"
      [id]="id"
      [attr.aria-selected]="selected()"
      [disabled]="disabled() || select.disabled()"
      [class]="classes()"
      (click)="select.selectOption(this)"
      (keydown)="selectOptionOnKey($event)"
    >
      <span
        class="min-w-0 flex flex-1 items-center gap-3 truncate text-left [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.3] [&_svg]:stroke-linecap-round [&_svg]:stroke-linejoin-round"
      >
        <ng-content />
      </span>
      @if (showIndicator()) {
      <svg
        class="size-6 shrink-0 fill-none stroke-current stroke-[3] stroke-linecap-round stroke-linejoin-round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m20 6-11 11-5-5" />
      </svg>
      }
    </button>
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSelectOption {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly select = inject(NB_SELECT);

  readonly id = `neo-select-option-${nextSelectOptionId++}`;
  readonly value = input<NbSelectValue | null>(null);
  readonly label = input('');
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly selected = computed(() => {
    const value = this.value();

    return this.select.isSelected(value);
  });

  protected readonly showIndicator = computed(
    () => this.value() !== null && this.selected()
  );

  protected readonly classes = computed(() =>
    nbClass(
      'flex h-11 w-full items-center gap-3 px-2',
      'font-mono text-base font-bold text-(--nb-select-fg)',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nb-select-border)',
      'disabled:pointer-events-none disabled:opacity-50',
      this.selected()
        ? 'bg-[#bdf7c8]'
        : 'bg-transparent hover:bg-[#e8d6ff] focus-visible:bg-[#e8d6ff]'
    )
  );

  focus(): void {
    this.element.nativeElement.querySelector('button')?.focus();
  }

  selectOptionOnKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.select.focusPreviousOption(this);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.select.focusNextOption(this);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.select.closeAndFocusTrigger();
    }
  }
}
