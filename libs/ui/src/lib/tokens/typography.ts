/**
 * Shared typography vocabulary. One source of truth for the font-weight scale,
 * the font-role contract, underline customization, and the text-tracking scale
 * so a token means the same thing across nbText / nbDisplay / nbTypography /
 * nbChipGroup.
 */

/**
 * Shared underline variant used by both nbText and nbDisplay.
 * `NbTextUnderline` and `NbDisplayUnderline` are public aliases of this type.
 */
export type NbUnderlineVariant = 'none' | 'bar' | 'wave';

/**
 * Letter-spacing scale shared by nbText and nbChipGroup.
 * Exported publicly as `NbTextTracking` from the text barrel.
 */
export type NbTextTracking = 'tight' | 'normal' | 'wide' | 'wider';

/** Font-weight scale shared by nbText and nbDisplay. */
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

/**
 * Font-role contract. The API picks a *role*; the role maps to a CSS token that
 * defines the actual stack, so theming/customization stays in CSS and templates
 * keep type safety. Each role falls back to the sans stack when its token is
 * unset. `inherit` writes nothing so the element keeps its inherited font.
 */
export type NbTypographyFont = 'inherit' | 'body' | 'display' | 'accent' | 'mono';

const FONT_ROLE_VALUES: Record<NbTypographyFont, string | null> = {
  inherit: null,
  body: 'var(--nb-font-body, var(--nb-font-sans))',
  display: 'var(--nb-font-display, var(--nb-font-sans))',
  accent: 'var(--nb-font-accent, var(--nb-font-sans))',
  mono: 'var(--nb-font-mono, monospace)',
};

export function nbTypographyFontValue(font: NbTypographyFont): string | null {
  return FONT_ROLE_VALUES[font];
}

/**
 * Underline customization shared by nbText / nbDisplay `underline="bar"|"wave"`.
 * Writes the public `--nb-underline-gap` / `--nb-underline-width` tokens that the
 * underline CSS already reads. `auto` leaves the CSS default in place. Color and
 * thickness remain token-driven (`--nb-underline-color`, `--nb-underline-height`)
 * for the rarer brand-specific cases.
 */
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
