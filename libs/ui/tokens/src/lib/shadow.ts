export type NbShadow = 'none' | 'sm' | 'default' | 'hard' | 'heavy';

const SHADOW_VALUES: Record<NbShadow, string> = {
  none: 'none',
  sm: 'var(--nb-shadow-sm, calc(var(--nb-shadow-offset-x) * 0.5) calc(var(--nb-shadow-offset-y) * 0.5) 0 0 var(--nb-shadow))',
  default:
    'var(--nb-shadow-offset-x) var(--nb-shadow-offset-y) 0 0 var(--nb-shadow)',
  hard: 'var(--nb-shadow-hard, calc(var(--nb-shadow-offset-x) * 1.5) calc(var(--nb-shadow-offset-y) * 1.5) 0 0 var(--nb-shadow))',
  heavy:
    'var(--nb-shadow-heavy, calc(var(--nb-shadow-offset-x) * 2.5) calc(var(--nb-shadow-offset-y) * 2.5) 0 0 var(--nb-shadow))',
};

export function nbShadowValue(shadow: NbShadow): string {
  return SHADOW_VALUES[shadow];
}
