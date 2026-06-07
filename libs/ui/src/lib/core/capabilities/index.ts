// INTERNAL barrel. Consumed by library primitives and re-exported from the
// package entry point only under Angular-private ɵ names because hostDirectives
// must be reachable for library packaging. Users compose public primitives
// instead of importing capabilities.
export {
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from './nb-style-tokens';
export {
  nbBorderWidthFallback,
  nbGapFallback,
  nbPaddingFallback,
  nbRadiusFallback,
  nbShadowFallback,
  nbToneFallbacks,
} from './nb-style-fallbacks';
export { NbToneCapability } from './nb-tone-capability';
export { NbRadiusCapability } from './nb-radius-capability';
export { NbShadowCapability } from './nb-shadow-capability';
export { NbBorderCapability } from './nb-border-capability';
export { NbPaddingCapability } from './nb-padding-capability';
export { NbGapCapability } from './nb-gap-capability';
export { NbUnderlineCapability } from './nb-underline-capability';
export { NbResetMarginCapability } from './nb-reset-margin-capability';
