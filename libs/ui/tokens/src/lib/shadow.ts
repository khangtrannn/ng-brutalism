export type NbShadow = 'none' | 'sm' | 'md' | 'hard' | 'heavy';

const SHADOW_VALUES: Record<NbShadow, string> = {
  none: 'none',
  sm: 'var(--nb-shadow-sm)',
  md: 'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)',
  hard: 'var(--nb-shadow-hard)',
  heavy: 'var(--nb-shadow-heavy)',
};

export function nbShadowValue(shadow: NbShadow): string {
  return SHADOW_VALUES[shadow];
}
