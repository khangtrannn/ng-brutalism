export type NbPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const PADDING_VALUES: Record<NbPadding, string> = {
  none: '0px',
  xs: 'var(--nb-padding-xs)',
  sm: 'var(--nb-padding-sm)',
  md: 'var(--nb-padding-md)',
  lg: 'var(--nb-padding-lg)',
  xl: 'var(--nb-padding-xl)',
};

export function nbPaddingValue(padding: NbPadding): string {
  return PADDING_VALUES[padding];
}
