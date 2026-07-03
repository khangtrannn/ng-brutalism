export type NbShadow = 'none' | 'sm' | 'default' | 'hard' | 'heavy';

const SHADOW_VALUES: Record<NbShadow, string> = {
  none: 'none',
  sm: '2px 2px 0 0 var(--nb-shadow)',
  default:
    'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)',
  hard: '6px 6px 0 0 var(--nb-shadow)',
  heavy: '10px 10px 0 0 var(--nb-shadow)',
};

export function nbShadowValue(shadow: NbShadow): string {
  return SHADOW_VALUES[shadow];
}
