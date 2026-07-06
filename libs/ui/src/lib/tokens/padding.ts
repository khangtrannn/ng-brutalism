export type NbPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const PADDING_VALUES: Record<NbPadding, string> = {
  none: '0px',
  xs: 'var(--nb-padding-xs, 0.5rem)',
  sm: 'var(--nb-padding-sm, 0.75rem)',
  md: 'var(--nb-padding-md, 1rem)',
  lg: 'var(--nb-padding-lg, 1.5rem)',
  xl: 'var(--nb-padding-xl, 2rem)',
};

export function nbPaddingValue(padding: NbPadding): string {
  return PADDING_VALUES[padding];
}
