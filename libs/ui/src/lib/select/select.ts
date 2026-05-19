import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  booleanAttribute,
  computed,
  contentChildren,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';

import { nbClass } from '../core/class';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import { NbSelectOption } from './select-option';
import {
  NB_SELECT,
  type NbSelectController,
  type NbSelectValue,
} from './select.types';

let nextSelectId = 0;

@Component({
  selector: 'nb-select',
  standalone: true,
  template: `
    <button
      #trigger
      type="button"
      [id]="triggerId"
      [class]="triggerClasses()"
      [disabled]="disabled()"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="listboxId"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-labelledby]="ariaLabelledby()"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
    >
      <span class="min-w-0 flex-1 truncate text-left">
        {{ selectedLabel() || placeholder() }}
      </span>

      <svg
        class="size-6 shrink-0 fill-none stroke-current stroke-[3] stroke-linecap-round stroke-linejoin-round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path [attr.d]="open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
      </svg>
    </button>

    @if (open()) {
    <div
      [id]="listboxId"
      role="listbox"
      [attr.aria-labelledby]="triggerId"
      [class]="listboxClasses"
    >
      <ng-content />
    </div>
    }
  `,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '(document:click)': 'onDocumentClick($event)',
  },
  providers: [{ provide: NB_SELECT, useExisting: NbSelectComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSelectComponent implements NbSelectController, OnInit {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly group = inject(NB_INPUT_GROUP, { optional: true });

  readonly placeholder = input('Select an option');
  readonly defaultValue = input<NbSelectValue | null>(null);
  readonly value = model<NbSelectValue | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabelledby = input<string | null>(null, {
    alias: 'aria-labelledby',
  });

  readonly options = contentChildren(NbSelectOption);
  private readonly trigger =
    viewChild<ElementRef<HTMLButtonElement>>('trigger');

  readonly open = signal(false);

  readonly id = nextSelectId++;
  readonly triggerId = `neo-select-trigger-${this.id}`;
  readonly listboxId = `neo-select-listbox-${this.id}`;

  protected readonly selectedOption = computed(() =>
    this.options().find((option) => option.value() === this.value())
  );

  protected readonly selectedLabel = computed(
    () => this.selectedOption()?.label() ?? ''
  );

  protected readonly hostClasses = computed(() => {
    const inGroup = this.group !== null;
    return nbClass(
      '[--nb-select-bg:var(--nb-input-bg,var(--nb-field-bg))]',
      '[--nb-select-fg:var(--nb-foreground)]',
      '[--nb-select-border:var(--nb-border)]',
      '[--nb-select-radius:var(--nb-radius)]',
      '[--nb-select-listbox-bg:var(--nb-surface,#ffffff)]',
      inGroup
        ? 'block w-full'
        : [
            'relative block w-full',
            'rounded-(--nb-select-radius) border-2 border-(--nb-select-border)',
            'bg-(--nb-select-bg) shadow-nb',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-(--nb-select-border)',
            'focus-within:ring-offset-2 focus-within:shadow-none',
            'data-[disabled]:border-gray-400 data-[disabled]:shadow-[5px_5px_0_0_#a3a3a3]',
          ]
    );
  });

  protected readonly triggerClasses = computed(() => {
    const inGroup = this.group !== null;
    return nbClass(
      'flex h-14 w-full items-center gap-4 font-mono text-base font-bold',
      'text-(--nb-select-fg) transition-all duration-150',
      'disabled:cursor-not-allowed disabled:text-gray-400',
      inGroup
        ? ['flex-1 min-w-0 bg-transparent px-3 focus-visible:outline-none']
        : ['flex-1 min-w-0 bg-transparent px-5 focus-visible:outline-none']
    );
  });

  protected readonly listboxClasses = nbClass(
    'absolute z-50 top-[calc(100%+8px)]',
    'left-[-6px] w-[calc(100%+12px)] mt-0.5',
    'rounded-b-(--nb-select-radius) border-2 border-(--nb-select-border) bg-(--nb-select-listbox-bg)',
    'shadow-nb'
  );

  ngOnInit(): void {
    if (this.value() === null && this.defaultValue() !== null) {
      this.value.set(this.defaultValue());
    }

    this.open.set(this.defaultOpen());
  }

  isSelected(value: NbSelectValue | null): boolean {
    return this.value() === value;
  }

  selectOption(option: NbSelectOption): void {
    if (this.disabled() || option.disabled()) {
      return;
    }

    this.value.set(option.value());
    this.closeAndFocusTrigger();
  }

  toggle(): void {
    if (!this.disabled()) {
      this.open.update((open) => !open);
    }
  }

  openAndFocusOption(): void {
    if (this.disabled()) {
      return;
    }

    this.open.set(true);
    queueMicrotask(() => {
      (this.selectedOption() ?? this.firstEnabledOption())?.focus();
    });
  }

  closeAndFocusTrigger(): void {
    this.open.set(false);
    queueMicrotask(() => this.trigger()?.nativeElement.focus());
  }

  focusPreviousOption(current: NbSelectOption): void {
    this.focusRelativeOption(current, -1);
  }

  focusNextOption(current: NbSelectOption): void {
    this.focusRelativeOption(current, 1);
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      this.openAndFocusOption();
    }
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  private firstEnabledOption(): NbSelectOption | undefined {
    return this.options().find((option) => !option.disabled());
  }

  private focusRelativeOption(
    current: NbSelectOption,
    direction: 1 | -1
  ): void {
    const options = this.options().filter((option) => !option.disabled());
    const currentIndex = options.indexOf(current);
    const nextIndex =
      (currentIndex + direction + options.length) % options.length;

    options[nextIndex]?.focus();
  }
}
