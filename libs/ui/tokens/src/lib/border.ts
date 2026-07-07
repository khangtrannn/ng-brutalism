export type NbBorderStrength = 'none' | 'thin' | 'default' | 'strong' | 'thick';

const BORDER_WIDTH_VALUES: Record<NbBorderStrength, string> = {
  none: '0px',
  thin: 'var(--nb-border-width-thin, 1px)',
  default: 'var(--nb-border-width)',
  strong: 'var(--nb-border-width-strong, 3px)',
  thick: 'var(--nb-border-width-thick, 4px)',
};

export function nbBorderWidthValue(border: NbBorderStrength): string {
  return BORDER_WIDTH_VALUES[border];
}
