/**
 * Shared brutalist radius scale. One geometry per token across all primitives —
 * the single source of truth that internal radius capabilities resolve against.
 *
 * Named input values are deterministic. Theme-driven radius comes from
 * component defaults and scoped public tokens such as `--nb-button-radius`.
 */
export type NbRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

const RADIUS_VALUES: Record<NbRadius, string> = {
  none: 'var(--nb-radius-none, 0px)',
  sm: 'var(--nb-radius-sm, 0.25rem)',
  md: 'var(--nb-radius-md, 0.5rem)',
  lg: 'var(--nb-radius-lg, 0.75rem)',
  xl: 'var(--nb-radius-xl, 1rem)',
  full: 'var(--nb-radius-full, 9999px)',
};

export function nbRadiusValue(radius: NbRadius): string {
  return RADIUS_VALUES[radius];
}
