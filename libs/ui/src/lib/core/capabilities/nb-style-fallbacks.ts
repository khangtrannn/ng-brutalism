import { nbBorderWidthValue, type NbBorderStrength } from '../../tokens/border';
import { nbPaddingValue, type NbPadding } from '../../tokens/padding';
import { nbRadiusValue, type NbRadius } from '../../tokens/radius';
import { nbShadowValue, type NbShadow } from '../../tokens/shadow';
import { nbSpacingValue, type NbSpacing } from '../../tokens/spacing';
import { nbToneVars, type NbToneToken } from '../../tokens/tone';

export function nbToneFallbacks(
  namespace: string,
  tone: NbToneToken,
): { background: string; foreground: string; borderColor: string } {
  const defaults = nbToneVars(tone);

  return {
    background: `var(--nb-${namespace}-bg, ${defaults.bg})`,
    foreground: `var(--nb-${namespace}-fg, ${defaults.fg})`,
    borderColor: `var(--nb-${namespace}-border-color, ${defaults.borderColor})`,
  };
}

export function nbRadiusFallback(
  namespace: string,
  radius: NbRadius,
): string {
  const fallback = radius === 'md' ? 'var(--nb-radius)' : nbRadiusValue(radius);

  return `var(--nb-${namespace}-radius, ${fallback})`;
}

export function nbShadowFallback(
  namespace: string,
  shadow: NbShadow,
): string {
  return `var(--nb-${namespace}-shadow, ${nbShadowValue(shadow)})`;
}

export function nbBorderWidthFallback(
  namespace: string,
  border: NbBorderStrength,
): string {
  return `var(--nb-${namespace}-border-width, ${nbBorderWidthValue(border)})`;
}

export function nbPaddingFallback(
  namespace: string,
  padding: NbPadding,
): string {
  return `var(--nb-${namespace}-padding, ${nbPaddingValue(padding)})`;
}

export function nbGapFallback(namespace: string, gap: NbSpacing): string {
  return `var(--nb-${namespace}-gap, ${nbSpacingValue(gap)})`;
}
