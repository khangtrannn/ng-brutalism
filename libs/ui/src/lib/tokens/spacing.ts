/**
 * Shared spacing scale used for layout `gap` across nbStack / nbCluster /
 * nbSplit. One source of truth so a given gap token means the same distance
 * everywhere.
 */
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
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
};

export function nbSpacingValue(spacing: NbSpacing): string {
  return SPACING_VALUES[spacing];
}
