export type NbRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

const RADIUS_VALUES: Record<NbRadius, string> = {
  none: 'var(--nb-radius-none)',
  sm: 'var(--nb-radius-sm)',
  md: 'var(--nb-radius-md)',
  lg: 'var(--nb-radius-lg)',
  xl: 'var(--nb-radius-xl)',
  full: 'var(--nb-radius-full)',
};

export function nbRadiusValue(radius: NbRadius): string {
  return RADIUS_VALUES[radius];
}
