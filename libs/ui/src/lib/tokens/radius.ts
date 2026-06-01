/**
 * Shared brutalist radius scale. One geometry per token across all primitives —
 * the single source of truth that internal radius capabilities resolve against.
 *
 * Named input values are deterministic. Theme-driven radius comes from
 * component defaults and scoped public tokens such as `--nb-button-radius`.
 */
export type NbRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

const RADIUS_VALUES: Record<NbRadius, string> = {
  none: '0px',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

export function nbRadiusValue(radius: NbRadius): string {
  return RADIUS_VALUES[radius];
}
