/**
 * Shared border-strength scale. Resolves to a border *width* only — border
 * *color* is owned by the tone vocabulary (`nbToneVars().borderColor`) so the
 * two never fight. `default` tracks the themeable `--nb-border-width`.
 */
export type NbBorderStrength = 'none' | 'thin' | 'default' | 'strong' | 'thick';

const BORDER_WIDTH_VALUES: Record<NbBorderStrength, string> = {
  none: '0px',
  thin: '1px',
  default: 'var(--nb-border-width)',
  strong: '3px',
  thick: '4px',
};

export function nbBorderWidthValue(border: NbBorderStrength): string {
  return BORDER_WIDTH_VALUES[border];
}
