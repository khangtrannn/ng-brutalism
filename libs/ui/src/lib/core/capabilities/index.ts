// INTERNAL barrel. Consumed by library primitives only — NOT re-exported from
// the package entry point (`libs/ui/src/index.ts`). Capability directives are an
// internal composition mechanism; users compose the public primitives instead.
export {
  NB_STYLE_DEFAULTS,
  NB_STYLE_NAMESPACE,
  type NbStyleDefaults,
} from './nb-style-tokens';
export { NbToneCapability } from './nb-tone-capability';
export { NbRadiusCapability } from './nb-radius-capability';
export { NbShadowCapability } from './nb-shadow-capability';
export { NbBorderCapability } from './nb-border-capability';
export { NbPaddingCapability } from './nb-padding-capability';
export { NbGapCapability } from './nb-gap-capability';
export { NbUnderlineCapability } from './nb-underline-capability';
export { NbResetMarginCapability } from './nb-reset-margin-capability';
