import { booleanAttribute, computed, Directive, input } from '@angular/core';

export type NbIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type NbIconTone =
  | 'current'
  | 'default'
  | 'muted'
  | 'inverse'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'success'
  | 'warning';

export type NbIconMode = 'mask' | 'image';

const sizeMap: Record<NbIconSize, string> = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
};

const toneMap: Record<NbIconTone, string> = {
  current: 'currentColor',
  default: 'var(--nb-foreground)',
  muted: 'color-mix(in srgb, var(--nb-foreground) 75%, transparent)',
  inverse: 'var(--nb-background)',
  primary: 'var(--nb-primary)',
  secondary: 'var(--nb-secondary)',
  accent: 'var(--nb-accent)',
  danger: 'var(--nb-danger)',
  success: 'var(--nb-success)',
  warning: 'var(--nb-warning)',
};

@Directive({
  selector: '[nbIcon]',
  standalone: true,
  exportAs: 'nbIcon',
  host: {
    '[attr.data-nb-icon]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-mode]': 'mode()',

    '[attr.role]': 'roleValue()',
    '[attr.aria-hidden]': 'ariaHiddenValue()',
    '[attr.aria-label]': 'ariaLabelValue()',

    '[style.--nb-icon-color]': 'toneValue()',

    '[style.display]': '"inline-block"',
    '[style.width]': 'sizeValue()',
    '[style.height]': 'sizeValue()',
    '[style.flex-shrink]': '"0"',
    '[style.vertical-align]': '"middle"',
    '[style.color]': 'toneValue()',

    '[style.background-color]': 'backgroundColorValue()',
    '[style.background-image]': 'backgroundImageValue()',
    '[style.background-size]': 'backgroundSizeValue()',
    '[style.background-position]': 'backgroundPositionValue()',
    '[style.background-repeat]': 'backgroundRepeatValue()',

    '[style.mask-image]': 'maskImageValue()',
    '[style.-webkit-mask-image]': 'maskImageValue()',
    '[style.mask-size]': 'maskSizeValue()',
    '[style.-webkit-mask-size]': 'maskSizeValue()',
    '[style.mask-position]': 'maskPositionValue()',
    '[style.-webkit-mask-position]': 'maskPositionValue()',
    '[style.mask-repeat]': 'maskRepeatValue()',
    '[style.-webkit-mask-repeat]': 'maskRepeatValue()',
  },
})
export class NbIcon {
  readonly src = input.required<string>();
  readonly mode = input<NbIconMode>('mask');
  readonly size = input<NbIconSize>('md');
  readonly tone = input<NbIconTone>('current');
  readonly decorative = input(false, { transform: booleanAttribute });
  readonly label = input<string | null>(null);

  protected readonly sizeValue = computed(() => sizeMap[this.size()]);
  protected readonly toneValue = computed(() => toneMap[this.tone()]);

  protected readonly srcValue = computed(() => `url("${this.src()}")`);

  protected readonly isMaskMode = computed(() => this.mode() === 'mask');
  protected readonly isImageMode = computed(() => this.mode() === 'image');

  protected readonly roleValue = computed(() =>
    !this.decorative() && this.label() ? 'img' : null,
  );

  protected readonly ariaHiddenValue = computed(() =>
    this.decorative() ? 'true' : null,
  );

  protected readonly ariaLabelValue = computed(() =>
    this.decorative() ? null : this.label(),
  );

  protected readonly backgroundColorValue = computed(() =>
    this.isMaskMode() ? 'var(--nb-icon-color, currentColor)' : null,
  );

  protected readonly backgroundImageValue = computed(() =>
    this.isImageMode() ? this.srcValue() : null,
  );

  protected readonly backgroundSizeValue = computed(() =>
    this.isImageMode() ? 'contain' : null,
  );

  protected readonly backgroundPositionValue = computed(() =>
    this.isImageMode() ? 'center' : null,
  );

  protected readonly backgroundRepeatValue = computed(() =>
    this.isImageMode() ? 'no-repeat' : null,
  );

  protected readonly maskImageValue = computed(() =>
    this.isMaskMode() ? this.srcValue() : null,
  );

  protected readonly maskSizeValue = computed(() =>
    this.isMaskMode() ? 'contain' : null,
  );

  protected readonly maskPositionValue = computed(() =>
    this.isMaskMode() ? 'center' : null,
  );

  protected readonly maskRepeatValue = computed(() =>
    this.isMaskMode() ? 'no-repeat' : null,
  );
}
