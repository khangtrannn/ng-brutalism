import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  contentChildren,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import { NbSelectOption } from './nb-select-option';
import {
  NB_SELECT,
  type NbSelectController,
  type NbSelectValue,
} from './select.types';

let nextSelectId = 0;

@Component({
  selector: 'nb-select',
  template: `
    <button
      #trigger
      type="button"
      [id]="triggerId"
      [class]="triggerClasses()"
      [style.color]="foregroundStyle()"
      [disabled]="disabled()"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="listboxId"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-labelledby]="ariaLabelledby()"
      (click)="toggle()"
      (keydown)="openListboxOnKey($event)"
    >
      <span [class]="valueClasses()">
        {{ selectedLabel() || placeholder() }}
      </span>

      <svg
        class="size-6 shrink-0 fill-none stroke-current stroke-3 stroke-linecap-round stroke-linejoin-round"
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
      [style.background-color]="listboxBackgroundStyle()"
      [style.border-color]="listboxBorderColorStyle()"
    >
      <ng-content />
    </div>
    }
  `,
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'select' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { tone: 'surface', border: 'default' } satisfies NbStyleDefaults,
    },
    { provide: NB_SELECT, useExisting: NbSelect },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '(document:click)': 'closeOnOutsideClick($event)',
    '[style.background-color]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-width]': 'borderWidthStyle()',
    '[style.--nb-select-focus-ring-color]': 'selectFocusRingColorStyle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSelect implements NbSelectController {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  protected readonly isInGroup = this.group !== null;

  private readonly tone = inject(NbToneCapability);
  private readonly border = inject(NbBorderCapability);

  protected readonly backgroundStyle = computed(() =>
    this.isInGroup ? 'transparent' : this.tone.background(),
  );
  protected readonly foregroundStyle = computed(() => this.tone.foreground());
  protected readonly borderColorStyle = computed(() => this.tone.borderColor());
  protected readonly borderWidthStyle = computed(() =>
    this.isInGroup ? '0' : this.border.width(),
  );

  protected readonly listboxBackgroundStyle = computed(() =>
    this.tone.background(),
  );
  protected readonly listboxBorderColorStyle = computed(() =>
    this.tone.borderColor(),
  );
  protected readonly selectFocusRingColorStyle = computed(() =>
    this.tone.borderColor(),
  );
  readonly optionForegroundStyle = computed(() => this.tone.foreground());
  readonly optionFocusRingColorStyle = computed(() => this.tone.borderColor());

  readonly placeholder = input<string>('Select an option');
  readonly value = model<NbSelectValue | null>(null);
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabelledby = input<string | null>(null, {
    alias: 'aria-labelledby',
  });

  readonly options = contentChildren(NbSelectOption);
  private readonly trigger =
    viewChild<ElementRef<HTMLButtonElement>>('trigger');

  readonly open = model<boolean>(false);

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
    const inGroup = this.isInGroup;
    return nbClass(
      '[--nb-select-radius:var(--nb-radius)]',
      inGroup
        ? 'block w-full'
        : [
            'relative block w-full',
            'rounded-(--nb-select-radius)',
            'shadow-nb',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--nb-select-focus-ring-color,var(--nb-select-border-color,var(--nb-border)))]',
            'focus-within:ring-offset-2 focus-within:shadow-none',
            'data-[disabled]:border-gray-400 data-[disabled]:shadow-[5px_5px_0_0_#a3a3a3]',
          ]
    );
  });

  protected readonly triggerClasses = computed(() => {
    const inGroup = this.isInGroup;
    return nbClass(
      'flex h-14 w-full items-center gap-4 font-mono text-base font-bold',
      'text-[var(--nb-select-fg,var(--nb-surface-foreground))] transition-all duration-150',
      'disabled:cursor-not-allowed disabled:text-gray-400',
      inGroup
        ? ['flex-1 min-w-0 bg-transparent px-3 focus-visible:outline-none']
        : ['flex-1 min-w-0 bg-transparent px-5 focus-visible:outline-none']
    );
  });

  protected readonly valueClasses = computed(() =>
    nbClass(
      'min-w-0 flex-1 truncate text-left',
      this.selectedLabel() ? 'text-inherit' : 'text-gray-400'
    )
  );

  protected readonly listboxClasses = nbClass(
    'absolute z-50 top-[calc(100%+8px)]',
    'left-[-6px] w-[calc(100%+12px)] mt-0.5',
    'rounded-b-(--nb-select-radius) border-2 border-[var(--nb-select-border-color,var(--nb-border))] bg-[var(--nb-select-listbox-bg,var(--nb-select-bg,var(--nb-surface)))]',
    'shadow-nb'
  );

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

  openListboxOnKey(event: KeyboardEvent): void {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      this.openAndFocusOption();
    }
  }

  closeOnOutsideClick(event: MouseEvent): void {
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
