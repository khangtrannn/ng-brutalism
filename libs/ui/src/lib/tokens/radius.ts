/**
 * Shared brutalist radius scale. One geometry per token across all primitives —
 * the single source of truth that internal radius capabilities resolve against.
 *
 * `md` maps to the themeable `--nb-radius` (default `0rem`, i.e. sharp corners).
 */
export type NbRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

const RADIUS_VALUES: Record<NbRadius, string> = {
  none: '0px',
  sm: '0.375rem',
  md: 'var(--nb-radius)',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
};

export function nbRadiusValue(radius: NbRadius): string {
  return RADIUS_VALUES[radius];
}
