import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CalloutAccessibility } from './components/callout-accessibility';
import { CalloutApi } from './components/callout-api';
import { CalloutExamples } from './components/callout-examples';
import { CalloutHero } from './components/callout-hero';
import { CalloutLayouts } from './components/callout-layouts';
import { CalloutPreview } from './components/callout-preview';
import { CalloutShadows } from './components/callout-shadows';
import { CalloutSizes } from './components/callout-sizes';
import { CalloutTokens } from './components/callout-tokens';
import { CalloutTones } from './components/callout-tones';
import { CalloutUsage } from './components/callout-usage';

@Component({
  selector: 'docs-callout-page',
  imports: [
    CalloutHero,
    CalloutPreview,
    CalloutUsage,
    CalloutExamples,
    CalloutTones,
    CalloutSizes,
    CalloutLayouts,
    CalloutShadows,
    CalloutTokens,
    CalloutAccessibility,
    CalloutApi,
  ],
  template: `
    <article>
      <docs-callout-hero />
      <docs-callout-preview />
      <docs-callout-usage />
      <docs-callout-examples />
      <docs-callout-tones />
      <docs-callout-sizes />
      <docs-callout-layouts />
      <docs-callout-shadows />
      <docs-callout-tokens />
      <docs-callout-accessibility />
      <docs-callout-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalloutPage {}
