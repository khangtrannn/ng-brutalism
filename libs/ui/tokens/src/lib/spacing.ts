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
  xs: 'var(--nb-space-xs)',
  sm: 'var(--nb-space-sm)',
  md: 'var(--nb-space-md)',
  lg: 'var(--nb-space-lg)',
  xl: 'var(--nb-space-xl)',
  '2xl': 'var(--nb-space-2xl)',
};

export function nbSpacingValue(spacing: NbSpacing): string {
  return SPACING_VALUES[spacing];
}
