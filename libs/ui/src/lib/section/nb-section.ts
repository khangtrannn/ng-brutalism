import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbPaddingCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  nbPaddingFallback,
  type NbStyleDefaults,
} from '../core/capabilities';
import type { NbDivider } from '../tokens/divider';
import type { NbPadding } from '../tokens/padding';

export type NbSectionPadding = NbPadding;

// `divider` is line placement between regions — distinct from `border`
// (outline strength) elsewhere in the library. Renamed from the former
// `border` input so `border` means strength library-wide.
export type NbSectionDivider = NbDivider;

export type NbSectionDividerStyle = 'solid' | 'dashed' | 'dotted';

export type NbSectionLayout = 'default' | 'center' | 'between';

export type NbSectionAlign = 'stretch' | 'start' | 'center' | 'end';

@Directive({
  selector: '[nbSection]',
  exportAs: 'nbSection',
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'section' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: { padding: 'md' } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [{ directive: NbPaddingCapability, inputs: ['padding'] }],
  host: {
    '[class]': 'classes()',
    '[attr.data-nb-section]': '""',
    '[attr.data-divider]': 'divider()',
    '[attr.data-divider-style]': 'dividerStyle()',
    '[attr.data-layout]': 'layout()',
    '[attr.data-align]': 'align()',
    '[attr.data-flush]': 'flush() ? "" : null',
    '[style.padding]': 'paddingStyle()',
    '[style.--nb-section-flush-margin]': 'flushMarginStyle()',
  },
})
export class NbSection {
  readonly divider = input<NbSectionDivider>('none');
  readonly dividerStyle = input<NbSectionDividerStyle>('solid');
  readonly layout = input<NbSectionLayout>('default');
  readonly align = input<NbSectionAlign>('stretch');
  readonly flush = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  private readonly padding = inject(NbPaddingCapability);

  protected readonly paddingStyle = computed(() => this.padding.value());

  // `flush` negates the section's own padding to let content bleed to the
  // edge. That needs the actual rendered padding (explicit input or the
  // `--nb-section-padding` hook fallback), hence the resolved value.
  protected readonly flushMarginStyle = computed(() =>
    this.flush()
      ? `calc(${this.padding.value() ?? nbPaddingFallback('section', 'md')} * -1)`
      : null,
  );

  protected readonly classes = computed(() =>
    nbClass(
      'box-border min-w-0',
      this.layoutClass(),
      this.alignClass(),
      this.dividerClass(),
      this.flush() && 'mx-(--nb-section-flush-margin)'
    )
  );

  private layoutClass(): string {
    const map: Record<NbSectionLayout, string> = {
      default: 'block',
      center: 'flex justify-center gap-[var(--nb-spacing-md,1rem)]',
      between: 'flex justify-between gap-[var(--nb-spacing-md,1rem)]',
    };

    return map[this.layout()];
  }

  private alignClass(): string {
    if (this.layout() === 'default') {
      return '';
    }

    const map: Record<NbSectionAlign, string> = {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    };

    return map[this.align()];
  }

  private dividerClass(): string {
    const side = this.divider();

    if (side === 'none') {
      return '';
    }

    const style = this.dividerStyleClass();

    const widthMap: Record<Exclude<NbSectionDivider, 'none'>, string> = {
      top: 'border-t-(length:--nb-border-width)',
      right: 'border-r-(length:--nb-border-width)',
      bottom: 'border-b-(length:--nb-border-width)',
      left: 'border-l-(length:--nb-border-width)',
      block: 'border-y-(length:--nb-border-width)',
      inline: 'border-x-(length:--nb-border-width)',
      all: 'border-(length:--nb-border-width)',
    };

    return nbClass(widthMap[side], 'border-(--nb-border)', style);
  }

  private dividerStyleClass(): string {
    const map: Record<NbSectionDividerStyle, string> = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    };

    return map[this.dividerStyle()];
  }
}
