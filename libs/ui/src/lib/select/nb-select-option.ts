import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { NbIdGenerator } from '../core/id-generator';
import { NB_SELECT, type NbSelectValue } from './select.types';

@Component({
  selector: 'nb-select-option',
  exportAs: 'nbSelectOption',
  template: `
    <button
      #button
      type="button"
      role="option"
      [id]="id"
      [attr.aria-selected]="selected()"
      [attr.data-selected]="selected() ? '' : null"
      [attr.aria-disabled]="isDisabled() ? 'true' : null"
      data-slot="select-option-button"
      (click)="select.selectOption(this)"
      (keydown)="selectOptionOnKey($event)"
    >
      <span data-slot="select-option-content">
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
    'data-nb-select-option': '',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSelectOption {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly idGenerator = inject(NbIdGenerator);

  protected readonly select = inject(NB_SELECT);

  readonly id = `nb-select-option-${this.idGenerator.next()}`;
  readonly value = input<NbSelectValue | null>(null);
  readonly label = input<string>('');
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly selected = computed(() => {
    const value = this.value();

    return this.select.isSelected(value);
  });

  protected readonly isDisabled = computed(
    () => this.disabled() || this.select.isDisabled()
  );

  protected readonly showIndicator = computed(
    () => this.value() !== null && this.selected()
  );

  focus(): void {
    this.element.nativeElement.querySelector('button')?.focus();
  }

  selectOptionOnKey(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.select.focusPreviousOption(this);
        return;
      case 'ArrowDown':
        event.preventDefault();
        this.select.focusNextOption(this);
        return;
      case 'Home':
        event.preventDefault();
        this.select.focusFirstOption();
        return;
      case 'End':
        event.preventDefault();
        this.select.focusLastOption();
        return;
      case 'Escape':
        event.preventDefault();
        this.select.closeAndFocusTrigger();
        return;
      case 'Tab':
        this.select.closeOnTab();
        return;
    }

    if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      this.select.handleTypeahead(this, event.key);
    }
  }
}
