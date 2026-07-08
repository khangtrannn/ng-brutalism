import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  PLATFORM_ID,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { NgControl, type ControlValueAccessor } from '@angular/forms';

import { NbToneCapability } from '../core/capabilities';
import { trackControlStatus } from '../core/control-status';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/input-transforms';
import { NbIdGenerator } from '../core/id-generator';
import { NB_FIELD } from '../field/field.types';
import { NB_INPUT_GROUP } from '../input-group/input-group.types';
import { NbSelectOption } from './nb-select-option';
import {
  NB_SELECT,
  type NbSelectController,
  type NbSelectSize,
  type NbSelectValue,
} from './select.types';

const TYPEAHEAD_RESET_MS = 500;

@Component({
  selector: 'nb-select',
  exportAs: 'nbSelect',
  template: `
    <button
      #trigger
      type="button"
      [id]="triggerElementId()"
      data-slot="select-trigger"
      [disabled]="isDisabled()"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="listboxId"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-labelledby]="ariaLabelledby()"
      [attr.aria-describedby]="field?.describedBy() ?? null"
      [attr.aria-invalid]="invalid() ? 'true' : null"
      [attr.aria-required]="required() ? 'true' : null"
      (click)="toggle()"
      (keydown)="openListboxOnKey($event)"
    >
      <span
        data-slot="select-value"
        [attr.data-placeholder]="selectedLabel() ? null : ''"
      >
        {{ selectedLabel() || placeholder() }}
      </span>

      <svg data-slot="select-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path [attr.d]="open() ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
      </svg>
    </button>

    @if (open()) {
    <div
      #listbox
      [id]="listboxId"
      role="listbox"
      popover="manual"
      [attr.aria-labelledby]="triggerElementId()"
      data-slot="select-listbox"
    >
      <ng-content />
    </div>
    }
  `,
  providers: [{ provide: NB_SELECT, useExisting: NbSelect }],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    '[attr.data-nb-select]': '""',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[attr.data-size]': 'size()',
    '[style.--nb-select-border-width]': 'border()',
    '[style.--nb-select-radius]': 'radius()',
    '[style.--nb-select-shadow]': 'shadow()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSelect implements NbSelectController, ControlValueAccessor {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly group = inject(NB_INPUT_GROUP, { optional: true });
  private readonly idGenerator = inject(NbIdGenerator);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly ngControl = inject(NgControl, {
    optional: true,
    self: true,
  });
  protected readonly field = inject(NB_FIELD, { optional: true });
  protected readonly isInGroup = this.group !== null;

  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });

  readonly size = input<NbSelectSize>('md');
  readonly placeholder = input<string>('Select an option');
  readonly value = model<NbSelectValue | null>(null);
  readonly compareWith = input<
    (a: NbSelectValue | null, b: NbSelectValue | null) => boolean
  >((a, b) => a === b);
  readonly disabled = input(false, {
    transform: booleanAttribute,
  });
  private readonly cvaDisabled = signal(false);
  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabelledby = input<string | null>(null, {
    alias: 'aria-labelledby',
  });

  readonly options = contentChildren(NbSelectOption);
  private readonly trigger =
    viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly listboxEl =
    viewChild<ElementRef<HTMLDivElement>>('listbox');

  readonly open = model<boolean>(false);

  readonly id = this.idGenerator.next();
  readonly triggerId = `nb-select-trigger-${this.id}`;
  readonly listboxId = `nb-select-listbox-${this.id}`;

  protected readonly triggerElementId = computed(
    () => this.field?.controlId ?? this.triggerId
  );

  protected readonly selectedOption = computed(() => {
    const compare = this.compareWith();
    const value = this.value();
    return this.options().find((option) => compare(option.value(), value));
  });

  protected readonly selectedLabel = computed(
    () => this.selectedOption()?.label() ?? ''
  );

  private readonly controlStatus = trackControlStatus(() => this.ngControl);
  protected readonly invalid = this.controlStatus.invalid;
  protected readonly required = this.controlStatus.required;

  private onChange: (value: NbSelectValue | null) => void = () => {};
  private onTouched: () => void = () => {};

  private typeaheadBuffer = '';
  private typeaheadTimeoutId: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    effect((onCleanup) => {
      if (!this.isBrowser || !this.open()) {
        return;
      }

      const handleOutsideClick = (event: MouseEvent) =>
        this.closeOnOutsideClick(event);

      this.document.addEventListener('click', handleOutsideClick);
      onCleanup(() =>
        this.document.removeEventListener('click', handleOutsideClick)
      );
    });

    effect((onCleanup) => {
      if (!this.isBrowser || !this.open()) {
        return;
      }

      const listbox = this.listboxEl()?.nativeElement;
      const triggerEl = this.trigger()?.nativeElement;

      if (!listbox || !triggerEl || typeof listbox.showPopover !== 'function') {
        return;
      }

      listbox.showPopover();

      const reposition = () => this.positionListbox(listbox, triggerEl);
      reposition();

      const view = this.document.defaultView;
      view?.addEventListener('scroll', reposition, true);
      view?.addEventListener('resize', reposition);

      onCleanup(() => {
        view?.removeEventListener('scroll', reposition, true);
        view?.removeEventListener('resize', reposition);
      });
    });

    let wasOpen = false;
    effect(() => {
      const isOpen = this.open();

      if (wasOpen && !isOpen) {
        this.onTouched();
      }

      wasOpen = isOpen;
    });
  }

  private positionListbox(listbox: HTMLElement, triggerEl: HTMLElement): void {
    const rect = triggerEl.getBoundingClientRect();

    listbox.style.position = 'fixed';
    listbox.style.top = `${rect.bottom}px`;
    listbox.style.left = `${rect.left}px`;
    listbox.style.width = `${rect.width}px`;
  }

  writeValue(value: NbSelectValue | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: NbSelectValue | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  isSelected(value: NbSelectValue | null): boolean {
    return this.compareWith()(this.value(), value);
  }

  selectOption(option: NbSelectOption): void {
    if (this.isDisabled() || option.disabled()) {
      return;
    }

    this.value.set(option.value());
    this.onChange(option.value());
    this.closeAndFocusTrigger();
  }

  toggle(): void {
    if (!this.isDisabled()) {
      this.open.update((open) => !open);
    }
  }

  openAndFocusOption(): void {
    if (this.isDisabled()) {
      return;
    }

    this.open.set(true);
    queueMicrotask(() => {
      (this.selectedOption() ?? this.options()[0])?.focus();
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

  focusFirstOption(): void {
    this.options()[0]?.focus();
  }

  focusLastOption(): void {
    const options = this.options();
    options[options.length - 1]?.focus();
  }

  handleTypeahead(current: NbSelectOption, key: string): void {
    if (this.typeaheadTimeoutId !== undefined) {
      clearTimeout(this.typeaheadTimeoutId);
    }

    this.typeaheadBuffer += key.toLowerCase();
    this.typeaheadTimeoutId = setTimeout(() => {
      this.typeaheadBuffer = '';
    }, TYPEAHEAD_RESET_MS);

    const options = this.options();
    const currentIndex = options.indexOf(current);
    const buffer = this.typeaheadBuffer;

    for (let offset = 1; offset <= options.length; offset++) {
      const option = options[(currentIndex + offset) % options.length];

      if (option.label().toLowerCase().startsWith(buffer)) {
        option.focus();
        return;
      }
    }
  }

  closeOnTab(): void {
    this.open.set(false);
  }

  openListboxOnKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open()) {
      event.preventDefault();
      this.closeAndFocusTrigger();
      return;
    }

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

  private focusRelativeOption(
    current: NbSelectOption,
    direction: 1 | -1
  ): void {
    const options = this.options();
    const currentIndex = options.indexOf(current);
    const nextIndex =
      (currentIndex + direction + options.length) % options.length;

    options[nextIndex]?.focus();
  }
}
