import { InjectionToken } from '@angular/core';

import type { NbBorderStrength } from '../../tokens/border';
import type { NbPadding } from '../../tokens/padding';
import type { NbRadius } from '../../tokens/radius';
import type { NbShadow } from '../../tokens/shadow';
import type { NbSpacing } from '../../tokens/spacing';
import type { NbToneToken } from '../../tokens/tone';

/**
 * INTERNAL. The CSS-variable namespace a primitive owns, e.g. `'surface'` →
 * capabilities write `--nb-surface-*`. Every primitive that composes a style
 * capability must provide this on its element injector.
 */
export const NB_STYLE_NAMESPACE = new InjectionToken<string>(
  'NB_STYLE_NAMESPACE',
);

/**
 * INTERNAL. Per-primitive default tokens. A capability resolves its value as:
 * explicit input → this default → the capability's own hard fallback.
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
