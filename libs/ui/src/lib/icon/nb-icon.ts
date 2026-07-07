import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  input,
  isDevMode,
} from '@angular/core';

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
  exportAs: 'nbIcon',
  host: {
    '[attr.data-nb-icon]': '""',
    '[attr.data-size]': 'size()',
    '[attr.data-icon-tone]': 'tone() ?? null',
    '[attr.data-mode]': 'mode()',

    '[attr.role]': 'roleValue()',
    '[attr.aria-hidden]': 'ariaHiddenValue()',
    '[attr.aria-label]': 'ariaLabelValue()',

    '[style.--nb-icon-color]': 'toneValue()',
    '[style.background-image]': 'backgroundImageValue()',
    '[style.mask-image]': 'maskImageValue()',
    '[style.-webkit-mask-image]': 'maskImageValue()',
  },
})
export class NbIcon {
  readonly src = input.required<string>();
  readonly mode = input<NbIconMode>('mask');
  readonly size = input<NbIconSize>('md');
  readonly tone = input<NbIconTone | undefined>(undefined);
  readonly decorative = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  readonly label = input<string | null>(null);

  private hasWarnedAboutMissingA11y = false;

  protected readonly toneValue = computed(() => {
    const tone = this.tone();
    return tone ? toneMap[tone] : null;
  });

  protected readonly srcValue = computed(() => `url("${this.src()}")`);

  protected readonly isMaskMode = computed(() => this.mode() === 'mask');
  protected readonly isImageMode = computed(() => this.mode() === 'image');

  protected readonly roleValue = computed(() =>
    !this.decorative() && this.label() ? 'img' : null
  );

  protected readonly ariaHiddenValue = computed(() =>
    this.decorative() ? 'true' : null
  );

  protected readonly ariaLabelValue = computed(() =>
    this.decorative() ? null : this.label()
  );

  protected readonly backgroundImageValue = computed(() =>
    this.isImageMode() ? this.srcValue() : null
  );

  protected readonly maskImageValue = computed(() =>
    this.isMaskMode() ? this.srcValue() : null
  );

  constructor() {
    if (isDevMode()) {
      effect(() => {
        if (
          !this.hasWarnedAboutMissingA11y &&
          !this.decorative() &&
          !this.label()
        ) {
          console.warn(
            '[ng-brutalism] nbIcon should be marked decorative or given a label.'
          );
          this.hasWarnedAboutMissingA11y = true;
        }
      });
    }
  }
}
