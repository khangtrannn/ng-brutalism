import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HalftoneAccessibility } from './components/halftone-accessibility';
import { HalftoneApi } from './components/halftone-api';
import { HalftoneCustomColor } from './components/halftone-custom-color';
import { HalftoneHero } from './components/halftone-hero';
import { HalftonePreview } from './components/halftone-preview';
import { HalftoneRectangle } from './components/halftone-rectangle';
import { HalftoneTokens } from './components/halftone-tokens';
import { HalftoneUsage } from './components/halftone-usage';

@Component({
  selector: 'docs-halftone-page',
  imports: [
    HalftoneHero,
    HalftonePreview,
    HalftoneUsage,
    HalftoneCustomColor,
    HalftoneRectangle,
    HalftoneTokens,
    HalftoneAccessibility,
    HalftoneApi,
  ],
  template: `
    <article>
      <docs-halftone-hero />
      <docs-halftone-preview />
      <docs-halftone-usage />
      <docs-halftone-custom-color />
      <docs-halftone-rectangle />
      <docs-halftone-tokens />
      <docs-halftone-accessibility />
      <docs-halftone-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HalftonePage {}
