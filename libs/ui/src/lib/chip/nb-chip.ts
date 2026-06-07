import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  computed,
  inject,
  input,
} from '@angular/core';

import { nbClass } from '../core/class';
import {
  NbBorderCapability,
  NbRadiusCapability,
  NbShadowCapability,
  NbToneCapability,
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from '../core/capabilities';
import { NbIcon, type NbIconSize } from '../icon';
import { nbRadiusValue, type NbRadius } from '../tokens/radius';
import { nbShadowValue, type NbShadow } from '../tokens/shadow';
import { nbSpacingValue, type NbSpacing } from '../tokens/spacing';
import type { NbToneToken } from '../tokens/tone';
import type { NbTextTracking } from '../tokens/typography';
import type { NbTextTransform } from '../text';

export type NbChipTone = NbToneToken;
export type NbChipRadius = NbRadius;
export type NbChipShadow = NbShadow;
// Token scale mirrors the layout directives for API consistency, but values
// stay chip-specific and asymmetric (horizontal > vertical) because a chip is
// an inline pill, not a container — uniform container padding would make it a
// box. Padding therefore stays primitive-local rather than using the shared
// padding capability.
export type NbChipPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

const paddingMap: Record<NbChipPadding, string> = {
  none: 'px-0 py-0',
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-0.5',
  lg: 'px-4 py-2',
  xl: 'px-5 py-2.5',
};

@Component({
  selector: 'span[nbChip]',
  imports: [NbIcon],
  providers: [
    { provide: NB_STYLE_NAMESPACE, useValue: 'chip' },
    {
      provide: NB_STYLE_DEFAULTS,
      useValue: {
        tone: 'default',
        radius: 'none',
        shadow: 'sm',
        border: 'default',
      } satisfies NbStyleDefaults,
    },
  ],
  hostDirectives: [
    { directive: NbToneCapability, inputs: ['tone'] },
    { directive: NbRadiusCapability, inputs: ['radius'] },
    { directive: NbShadowCapability, inputs: ['shadow'] },
    { directive: NbBorderCapability, inputs: ['border'] },
  ],
  template: `
    @if (icon()) {
      <span nbIcon [src]="icon()!" [size]="iconSize()" decorative></span>
    }
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-padding]': 'paddingAttr()',
    '[attr.data-nb-chip]': '""',
    '[style.background]': 'backgroundStyle()',
    '[style.color]': 'foregroundStyle()',
    '[style.border-color]': 'borderColorStyle()',
    '[style.border-radius]': 'radiusStyle()',
    '[style.box-shadow]': 'shadowStyle()',
    '[style.border-width]': 'borderWidthStyle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChip {
  readonly padding = input<NbChipPadding | undefined>(undefined);
  // Optional leading icon, given as an SVG/image URL. Rendered through nbIcon
  // in mask mode so it tints to the chip's foreground color. For full-color
  // or labeled icons, compose an `nbIcon` (or any element) as projected
  // content instead — the leading slot is only used when `icon` is set.
  readonly icon = input<string>();
  readonly iconSize = input<NbIconSize>('sm');

  private readonly tone = inject(NbToneCapability);
  private readonly radius = inject(NbRadiusCapability);
  private readonly shadow = inject(NbShadowCapability);
  private readonly border = inject(NbBorderCapability);

  protected readonly backgroundStyle = computed(() => this.tone.background());
  protected readonly foregroundStyle = computed(() => this.tone.foreground());
  protected readonly borderColorStyle = computed(() => this.tone.borderColor());
  protected readonly radiusStyle = computed(() => this.radius.value());
  protected readonly shadowStyle = computed(() => this.shadow.value());
  protected readonly borderWidthStyle = computed(() => this.border.width());
  protected readonly paddingAttr = computed(() => this.padding() ?? 'md');

  protected readonly classes = computed(() =>
    nbClass(
      'inline-flex items-center gap-1.5',
      'text-xs font-bold',
      paddingMap[this.padding() ?? 'md'],
      '[&_svg]:size-[var(--nb-chip-icon-size,0.75rem)] [&_svg]:shrink-0'
    )
  );
}

export type NbChipGroupDirection = 'horizontal' | 'vertical';
export type NbChipGroupAlign = 'start' | 'center' | 'end' | 'stretch';

const chipGroupAlignMap: Record<NbChipGroupAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const chipGroupTrackingMap: Record<NbTextTracking, string | null> = {
  tight: '-0.025em',
  normal: null,
  wide: '0.025em',
  wider: '0.05em',
};

/**
 * Layout + shared style context for a set of chips. Owns the row/column layout
 * (direction, gap, align) and broadcasts chip-level styling — radius, shadow,
 * text transform, tracking — to every child `nbChip` through CSS variables and
 * inherited text properties, so chips don't repeat the same inputs. Individual
 * `nbChip` inputs still override the group (explicit input beats context token).
 */
@Directive({
  selector: '[nbChipGroup]',
  host: {
    '[class]': 'classes()',
    '[style.gap]': 'gapValue()',
    '[style.--nb-chip-radius]': 'chipRadiusValue()',
    '[style.--nb-chip-shadow]': 'chipShadowValue()',
    '[style.text-transform]': 'transformValue()',
    '[style.letter-spacing]': 'trackingValue()',
    '[attr.data-nb-chip-group]': '""',
  },
})
export class NbChipGroup {
  readonly direction = input<NbChipGroupDirection>('horizontal');
  readonly gap = input<NbSpacing>('sm');
  readonly align = input<NbChipGroupAlign>('stretch');
  readonly radius = input<NbRadius | undefined>(undefined);
  readonly shadow = input<NbShadow | undefined>(undefined);
  readonly transform = input<NbTextTransform>('none');
  readonly tracking = input<NbTextTracking>('normal');

  protected readonly classes = computed(() =>
    nbClass(
      'flex min-w-0',
      this.direction() === 'vertical' ? 'flex-col' : 'flex-wrap',
      chipGroupAlignMap[this.align()]
    )
  );

  protected readonly gapValue = computed(() => nbSpacingValue(this.gap()));

  protected readonly chipRadiusValue = computed(() => {
    const radius = this.radius();
    return radius ? nbRadiusValue(radius) : null;
  });

  protected readonly chipShadowValue = computed(() => {
    const shadow = this.shadow();
    return shadow ? nbShadowValue(shadow) : null;
  });

  protected readonly transformValue = computed(() => {
    const transform = this.transform();
    return transform === 'none' ? null : transform;
  });

  protected readonly trackingValue = computed(
    () => chipGroupTrackingMap[this.tracking()],
  );
}
