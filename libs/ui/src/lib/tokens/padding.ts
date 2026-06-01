/**
 * Shared container-padding scale (uniform). Used by layout/container primitives
 * that own symmetric padding (nbSection / nbCluster / nbSplit). Pill-style
 * primitives (nbChip) and asymmetric surfaces keep their own padding because
 * their spacing is anatomy, not a uniform container token.
 */
export type NbPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const PADDING_VALUES: Record<NbPadding, string> = {
  none: '0px',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

export function nbPaddingValue(padding: NbPadding): string {
  return PADDING_VALUES[padding];
}
