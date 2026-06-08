import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

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
      [attr.data-selected]="selected() ? '' : null"
      [disabled]="disabled() || select.disabled()"
      data-slot="select-option-button"
      [style.color]="select.optionForegroundStyle()"
      [style.--nb-select-option-focus-ring-color]="select.optionFocusRingColorStyle()"
      (click)="select.selectOption(this)"
      (keydown)="selectOptionOnKey($event)"
    >
      <span
        data-slot="select-option-content"
      >
        <ng-content />
      </span>
      @if (showIndicator()) {
      <svg
        data-slot="select-option-indicator"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m20 6-11 11-5-5" />
      </svg>
      }
    </button>
  `,
  host: {
    '[attr.data-nb-select-option]': '""',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSelectOption {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly select = inject(NB_SELECT);

  readonly id = `neo-select-option-${nextSelectOptionId++}`;
  readonly value = input<NbSelectValue | null>(null);
  readonly label = input<string>('');
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly selected = computed(() => {
    const value = this.value();

    return this.select.isSelected(value);
  });

  protected readonly showIndicator = computed(
    () => this.value() !== null && this.selected()
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
