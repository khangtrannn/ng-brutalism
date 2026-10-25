import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { NbToneCapability } from '../core/capabilities';
import {
  nbBorderWidthStyleTransform,
  nbRadiusStyleTransform,
  nbShadowStyleTransform,
} from '../core/style-transforms';
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
      [attr.aria-invalid]="mergedInvalid() ? 'true' : null"
      [attr.aria-required]="mergedRequired() ? 'true' : null"
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
      [attr.data-nb-tone]="toneCapability.tone() ?? null"
      data-slot="select-listbox"
    >
      <ng-content />
    </div>
    }
  `,
  providers: [{ provide: NB_SELECT, useExisting: NbSelect }],
  hostDirectives: [{ directive: NbToneCapability, inputs: ['tone'] }],
  host: {
    'data-nb-select': '',
    '[attr.data-state]': 'open() ? "open" : "closed"',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-invalid]': 'mergedInvalid() ? "" : null',
    '[attr.data-in-group]': 'isInGroup ? "" : null',
    '[attr.data-size]': 'size()',
    '[style.--nb-select-border-width]': 'border()',
    '[style.--nb-select-radius]': 'radius()',
    '[style.--nb-select-shadow]': 'shadow()',
    '(focusout)': 'onFocusOut($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSelect implements NbSelectController {
  #element = inject<ElementRef<HTMLElement>>(ElementRef);
  #group = inject(NB_INPUT_GROUP, { optional: true });
  #idGenerator = inject(NbIdGenerator);
  #document = inject(DOCUMENT);
  #injector = inject(Injector);
  #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly #instanceId = this.#idGenerator.next();

  // Set by `NbSelectControlBridge` (forms-compat) — a classic CVA has no way to
  // write an `input()` from outside a template binding, so status mirroring goes
  // through these instead. ORed into the public signals below, same as `field?.*`.
  readonly #compatDisabled = signal(false);
  readonly #compatInvalid = signal(false);

  protected readonly field = inject(NB_FIELD, { optional: true });
  protected readonly toneCapability = inject(NbToneCapability);
  protected readonly isInGroup = this.#group !== null;

  readonly border = input(null, {
    transform: nbBorderWidthStyleTransform,
  });
  readonly radius = input(null, {
    transform: nbRadiusStyleTransform,
  });
  readonly shadow = input(null, {
    transform: nbShadowStyleTransform,
  });

  readonly id = input<string | undefined>(undefined);
  readonly size = input<NbSelectSize>('md');
  readonly placeholder = input<string>('Select an option');
  readonly value = model<NbSelectValue | null>(null);
  readonly compareWith = input<
    (a: NbSelectValue | null, b: NbSelectValue | null) => boolean
  >((a, b) => a === b);
  readonly disabled = input(false, {
    transform: booleanAttribute,
  });
  readonly invalid = input(false);
  readonly required = input(false);

  readonly isDisabled = computed(
    () => this.disabled() || this.#compatDisabled()
  );
  readonly touch = output<void>();
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

  readonly triggerId = `nb-select-trigger-${this.#instanceId}`;
  readonly listboxId = `nb-select-listbox-${this.#instanceId}`;

  protected readonly triggerElementId = computed(
    () => this.field?.controlId ?? this.id() ?? this.triggerId
  );

  protected readonly selectedOption = computed(() => {
    const compare = this.compareWith();
    const value = this.value();
    return this.options().find((option) => compare(option.value(), value));
  });

  protected readonly selectedLabel = computed(
    () => this.selectedOption()?.label() ?? ''
  );

  protected readonly mergedInvalid = computed(
    () =>
      this.invalid() ||
      this.#compatInvalid() ||
      (this.field?.invalid() ?? false)
  );
  protected readonly mergedRequired = computed(
    () => this.required() || (this.field?.required() ?? false)
  );

  private typeaheadBuffer = '';
  private typeaheadTimeoutId: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect((onCleanup) => {
      if (!this.#isBrowser || !this.open()) {
        return;
      }

      const handleOutsideClick = (event: MouseEvent) =>
        this.closeOnOutsideClick(event);

      this.#document.addEventListener('click', handleOutsideClick);
      onCleanup(() =>
        this.#document.removeEventListener('click', handleOutsideClick)
      );
    });

    effect((onCleanup) => {
      if (!this.#isBrowser || !this.open()) {
        return;
      }

      const listbox = this.listboxEl()?.nativeElement;
      const host = this.#element.nativeElement;

      if (!listbox || typeof listbox.showPopover !== 'function') {
        return;
      }

      listbox.showPopover();

      const reposition = () => this.positionListbox(listbox, host);
      reposition();

      const view = this.#document.defaultView;
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
        this.touch.emit();
      }

      wasOpen = isOpen;
    });
  }

  private positionListbox(listbox: HTMLElement, anchor: HTMLElement): void {
    const rect = anchor.getBoundingClientRect();
    const viewportHeight = this.#document.defaultView?.innerHeight ?? 0;

    // In the top layer the CSS `left: -6px; width: calc(100% + 12px)` overhang no
    // longer resolves against the host, so reproduce it here against the host rect.
    const overhang = 6;
    const gap = 2;
    const viewportPadding = 8;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUp =
      spaceBelow < listbox.offsetHeight && spaceAbove > spaceBelow;

    listbox.style.position = 'fixed';
    listbox.style.marginTop = '0';
    listbox.style.left = `${rect.left - overhang}px`;
    listbox.style.width = `${rect.width + overhang * 2}px`;

    if (openUp) {
      listbox.style.top = 'auto';
      listbox.style.bottom = `${viewportHeight - rect.top + gap}px`;
      listbox.style.maxHeight = `${spaceAbove - gap - viewportPadding}px`;
    } else {
      listbox.style.bottom = 'auto';
      listbox.style.top = `${rect.bottom + gap}px`;
      listbox.style.maxHeight = `${spaceBelow - gap - viewportPadding}px`;
    }
  }

  /** @internal Set by `NbSelectControlBridge` (forms-compat) — not for template use. */
  ɵsetCompatDisabled(disabled: boolean): void {
    this.#compatDisabled.set(disabled);
  }

  /** @internal Set by `NbSelectControlBridge` (forms-compat) — not for template use. */
  ɵsetCompatInvalid(invalid: boolean): void {
    this.#compatInvalid.set(invalid);
  }

  isSelected(value: NbSelectValue | null): boolean {
    // Argument order matches `selectedOption` — (candidate option, current value) —
    // so an asymmetric `compareWith` agrees between trigger label and option state.
    return this.compareWith()(value, this.value());
  }

  onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;

    if (!this.#element.nativeElement.contains(next)) {
      this.touch.emit();
    }
  }

  selectOption(option: NbSelectOption): void {
    if (this.isDisabled() || option.disabled()) {
      return;
    }

    this.value.set(option.value());
    this.closeAndFocusTrigger();
  }

  toggle(): void {
    if (!this.isDisabled()) {
      this.open.update((open) => !open);
    }
  }

  openAndFocusOption(fallback: 'first' | 'last' = 'first'): void {
    if (this.isDisabled()) {
      return;
    }

    this.open.set(true);
    // afterNextRender (not queueMicrotask) so focus lands after the @if renders
    // and shows the listbox — a microtask fires before that under zoneless CD.
    afterNextRender(
      () => {
        const options = this.options();
        const fallbackOption =
          fallback === 'last' ? options[options.length - 1] : options[0];
        (this.selectedOption() ?? fallbackOption)?.focus();
      },
      { injector: this.#injector }
    );
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

    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
      case ' ':
      case 'Home':
        event.preventDefault();
        this.openAndFocusOption('first');
        return;
      case 'ArrowUp':
      case 'End':
        event.preventDefault();
        this.openAndFocusOption('last');
        return;
    }
  }

  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.#element.nativeElement.contains(event.target as Node)) {
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
