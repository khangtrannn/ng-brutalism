export type NbSpacing =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl';

const SPACING_VALUES: Record<NbSpacing, string> = {
  none: '0px',
  xs: 'var(--nb-space-xs, 0.25rem)',
  sm: 'var(--nb-space-sm, 0.5rem)',
  md: 'var(--nb-space-md, 0.75rem)',
  lg: 'var(--nb-space-lg, 1rem)',
  xl: 'var(--nb-space-xl, 1.5rem)',
  '2xl': 'var(--nb-space-2xl, 2rem)',
};

export function nbSpacingValue(spacing: NbSpacing): string {
  return SPACING_VALUES[spacing];
}
