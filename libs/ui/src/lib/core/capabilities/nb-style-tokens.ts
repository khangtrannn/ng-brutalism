import { InjectionToken } from '@angular/core';

import type { NbBorderStrength } from '../../tokens/border';
import type { NbPadding } from '../../tokens/padding';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbSpacing } from '../../tokens/spacing';
import type { NbToneToken } from '../../tokens/tone';

/**
 * INTERNAL. The CSS-variable namespace a primitive owns, e.g. `'surface'` →
 * fallback helpers build `--nb-surface-*` public token chains. Every primitive
 * that composes a style capability must provide this on its element injector.
 */
export const NB_STYLE_NAMESPACE = new InjectionToken<string>(
  'NB_STYLE_NAMESPACE',
);

/**
 * INTERNAL. Per-primitive default tokens. Style capabilities never read these —
 * CSS fallback rules own the visual defaults and `data-*` attrs reflect only
 * explicit consumer choices. Consumed only by primitives that resolve a token to
 * a literal at render time (e.g. SVG fills) where no CSS fallback chain exists.
 */
export interface NbStyleDefaults {
  tone?: NbToneToken;
  radius?: NbRadius;
  shadow?: NbShadow;
  border?: NbBorderStrength;
  padding?: NbPadding;
  gap?: NbSpacing;
}

export const NB_STYLE_DEFAULTS = new InjectionToken<NbStyleDefaults>(
  'NB_STYLE_DEFAULTS',
  { factory: () => ({}) },
);
