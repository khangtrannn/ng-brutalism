import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MarqueeAccessibility } from './components/marquee-accessibility';
import { MarqueeApi } from './components/marquee-api';
import { MarqueeCustomSpeed } from './components/marquee-custom-speed';
import { MarqueeHero } from './components/marquee-hero';
import { MarqueePauseOnHover } from './components/marquee-pause-on-hover';
import { MarqueePreview } from './components/marquee-preview';
import { MarqueeReverse } from './components/marquee-reverse';
import { MarqueeTokens } from './components/marquee-tokens';
import { MarqueeUsage } from './components/marquee-usage';

@Component({
  selector: 'docs-marquee-page',
  imports: [
    MarqueeHero,
    MarqueePreview,
    MarqueeUsage,
    MarqueeReverse,
    MarqueeCustomSpeed,
    MarqueePauseOnHover,
    MarqueeTokens,
    MarqueeAccessibility,
    MarqueeApi,
  ],
  template: `
    <article>
      <docs-marquee-hero />
      <docs-marquee-preview />
      <docs-marquee-usage />
      <docs-marquee-reverse />
      <docs-marquee-custom-speed />
      <docs-marquee-pause-on-hover />
      <docs-marquee-tokens />
      <docs-marquee-accessibility />
      <docs-marquee-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarqueePage {}
