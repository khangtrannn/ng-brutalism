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

import { nbBorderWidthValue, type NbBorderStrength } from '../tokens/border';
import { nbToneVars, type NbTone } from '../tokens/tone';
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
      data-slot="select-trigger"
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
      <span
        data-slot="select-value"
        [attr.data-placeholder]="selectedLabel() ? null : ''"
      >
        {{ selectedLabel() || placeholder() }}
      </span>

      <svg
        data-slot="select-icon"
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
      data-slot="select-listbox"
      [style.background-color]="listboxBackgroundStyle()"
      [style.border-color]="listboxBorderColorStyle()"
    >
      <ng-content />
    </div>
    }
  `,
  providers: [{ provide: NB_SELECT, useExisting: NbSelect }],
  host: {
    '[attr.data-nb-select]': '""',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
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

  // Conditional application (group merging) and inner-element listbox/options
  // mean the select resolves tone/border itself rather than composing the
  // host-painting capabilities.
  readonly tone = input<NbTone | undefined>(undefined);
  readonly border = input<NbBorderStrength | undefined>(undefined);

  private readonly toneVars = computed(() => {
    const tone = this.tone();
    return tone ? nbToneVars(tone) : null;
  });
  protected readonly foregroundStyle = computed(
    () => this.toneVars()?.fg ?? null,
  );
  protected readonly borderColorStyle = computed(
    () => this.toneVars()?.borderColor ?? null,
  );

  protected readonly backgroundStyle = computed(() =>
    this.isInGroup ? 'transparent' : (this.toneVars()?.bg ?? null),
  );
  protected readonly borderWidthStyle = computed(() => {
    if (this.isInGroup) {
      return '0';
    }
    const border = this.border();
    return border ? nbBorderWidthValue(border) : null;
  });

  protected readonly listboxBackgroundStyle = computed(
    () => this.toneVars()?.bg ?? null,
  );
  protected readonly listboxBorderColorStyle = this.borderColorStyle;
  protected readonly selectFocusRingColorStyle = this.borderColorStyle;
  readonly optionForegroundStyle = this.foregroundStyle;
  readonly optionFocusRingColorStyle = this.borderColorStyle;

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
