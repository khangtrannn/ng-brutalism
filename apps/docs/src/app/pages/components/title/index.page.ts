import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleAccessibility } from './components/title-accessibility';
import { TitleApi } from './components/title-api';
import { TitleCustomWave } from './components/title-custom-wave';
import { TitleHero } from './components/title-hero';
import { TitleMixedContent } from './components/title-mixed-content';
import { TitlePreview } from './components/title-preview';
import { TitleTokens } from './components/title-tokens';
import { TitleUsage } from './components/title-usage';

@Component({
  selector: 'docs-title-page',
  imports: [
    TitleHero,
    TitlePreview,
    TitleUsage,
    TitleCustomWave,
    TitleMixedContent,
    TitleTokens,
    TitleAccessibility,
    TitleApi,
  ],
  template: `
    <article>
      <docs-title-hero />
      <docs-title-preview />
      <docs-title-usage />
      <docs-title-custom-wave />
      <docs-title-mixed-content />
      <docs-title-tokens />
      <docs-title-accessibility />
      <docs-title-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TitlePage {}
