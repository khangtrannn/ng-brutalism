import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconAccessibility } from './components/icon-accessibility';
import { IconApi } from './components/icon-api';
import { IconComposition } from './components/icon-composition';
import { IconHero } from './components/icon-hero';
import { IconModes } from './components/icon-modes';
import { IconPreview } from './components/icon-preview';
import { IconSizes } from './components/icon-sizes';
import { IconTokens } from './components/icon-tokens';
import { IconTones } from './components/icon-tones';
import { IconUsage } from './components/icon-usage';

@Component({
  selector: 'docs-icon-page',
  imports: [
    IconHero,
    IconPreview,
    IconUsage,
    IconSizes,
    IconTones,
    IconModes,
    IconAccessibility,
    IconComposition,
    IconTokens,
    IconApi,
  ],
  template: `
    <article>
      <docs-icon-hero />
      <docs-icon-preview />
      <docs-icon-usage />
      <docs-icon-sizes />
      <docs-icon-tones />
      <docs-icon-modes />
      <docs-icon-accessibility />
      <docs-icon-composition />
      <docs-icon-tokens />
      <docs-icon-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconPage {}
