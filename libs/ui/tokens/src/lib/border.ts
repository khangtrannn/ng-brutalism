export type NbBorderStrength = 'none' | 'thin' | 'md' | 'strong' | 'thick';

const BORDER_WIDTH_VALUES: Record<NbBorderStrength, string> = {
  none: '0px',
  thin: 'var(--nb-border-width-thin)',
  md: 'var(--nb-border-width)',
  strong: 'var(--nb-border-width-strong)',
  thick: 'var(--nb-border-width-thick)',
};

export function nbBorderWidthValue(border: NbBorderStrength): string {
  return BORDER_WIDTH_VALUES[border];
}
