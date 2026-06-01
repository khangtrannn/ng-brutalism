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

/**
 * INTERNAL. Builds the two-tier style variables for a cascade-aware capability:
 *
 * - `--nb-<ns>-<prop>-default` is ALWAYS written from the primitive's default
 *   token. Consumers read it as the fallback tier.
 * - `--nb-<ns>-<prop>` is written ONLY when an explicit input is provided, so a
 *   per-instance input wins. When omitted, the element declares no value for
 *   this variable, letting an ancestor override (e.g. `[--nb-chip-radius:4px]`)
 *   flow in by inheritance — otherwise the fallback tier applies.
 *
 * Consumers therefore read `var(--nb-<ns>-<prop>, var(--nb-<ns>-<prop>-default))`.
 */
export function nbCapabilityVars<T extends string>(
  namespace: string,
  property: string,
  toValue: (token: T) => string,
  explicit: T | undefined,
  fallback: T,
): Record<string, string> {
  const vars: Record<string, string> = {
    [`--nb-${namespace}-${property}-default`]: toValue(fallback),
  };

  if (explicit !== undefined) {
    vars[`--nb-${namespace}-${property}`] = toValue(explicit);
  }

  return vars;
}
