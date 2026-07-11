import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SurfaceAccessibility } from './components/surface-accessibility';
import { SurfaceApi } from './components/surface-api';
import { SurfaceClip } from './components/surface-clip';
import { SurfaceHero } from './components/surface-hero';
import { SurfaceInteractive } from './components/surface-interactive';
import { SurfacePreview } from './components/surface-preview';
import { SurfaceShape } from './components/surface-shape';
import { SurfaceTokens } from './components/surface-tokens';
import { SurfaceTones } from './components/surface-tones';
import { SurfaceUsage } from './components/surface-usage';

@Component({
  selector: 'docs-surface-page',
  imports: [
    SurfaceHero,
    SurfacePreview,
    SurfaceUsage,
    SurfaceTones,
    SurfaceShape,
    SurfaceClip,
    SurfaceInteractive,
    SurfaceTokens,
    SurfaceAccessibility,
    SurfaceApi,
  ],
  template: `
    <article>
      <docs-surface-hero />
      <docs-surface-preview />
      <docs-surface-usage />
      <docs-surface-tones />
      <docs-surface-shape />
      <docs-surface-clip />
      <docs-surface-interactive />
      <docs-surface-tokens />
      <docs-surface-accessibility />
      <docs-surface-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SurfacePage {}
