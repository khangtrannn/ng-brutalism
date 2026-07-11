import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IntroductionComposition } from './components/introduction-composition';
import { IntroductionExploring } from './components/introduction-exploring';
import { IntroductionHero } from './components/introduction-hero';
import { IntroductionQuickStart } from './components/introduction-quick-start';
import { IntroductionWhy } from './components/introduction-why';

@Component({
  selector: 'docs-introduction-page',
  imports: [
    IntroductionComposition,
    IntroductionExploring,
    IntroductionHero,
    IntroductionQuickStart,
    IntroductionWhy,
  ],
  template: `
    <article>
      <docs-introduction-hero />
      <docs-introduction-why />
      <docs-introduction-quick-start />
      <docs-introduction-exploring />
      <docs-introduction-composition />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IntroductionPage {}
