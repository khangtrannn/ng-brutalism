export type NbUnderlineVariant = 'none' | 'bar' | 'wave';

export type NbTextTracking = 'tight' | 'normal' | 'wide' | 'wider';

export type NbFontWeight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

const FONT_WEIGHT_VALUES: Record<NbFontWeight, string> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

export function nbFontWeightValue(weight: NbFontWeight): string {
  return FONT_WEIGHT_VALUES[weight];
}

export type NbTypographyFont = 'inherit' | 'body' | 'display' | 'accent' | 'mono';

const FONT_ROLE_VALUES: Record<NbTypographyFont, string | null> = {
  inherit: null,
  body: 'var(--nb-font-body)',
  display: 'var(--nb-font-display)',
  accent: 'var(--nb-font-accent)',
  mono: 'var(--nb-font-mono)',
};

export function nbTypographyFontValue(font: NbTypographyFont): string | null {
  return FONT_ROLE_VALUES[font];
}

export type NbUnderlineGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type NbUnderlineWidth = 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'full';

const UNDERLINE_GAP_VALUES: Record<NbUnderlineGap, string> = {
  none: '0',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1.25rem',
};

const UNDERLINE_WIDTH_VALUES: Record<NbUnderlineWidth, string | null> = {
  auto: null,
  xs: '2rem',
  sm: '4rem',
  md: '7rem',
  lg: '12rem',
  full: '100%',
};

export function nbUnderlineGapValue(gap: NbUnderlineGap): string {
  return UNDERLINE_GAP_VALUES[gap];
}

export function nbUnderlineWidthValue(width: NbUnderlineWidth): string | null {
  return UNDERLINE_WIDTH_VALUES[width];
}
