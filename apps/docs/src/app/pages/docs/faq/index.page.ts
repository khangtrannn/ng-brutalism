import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FaqComponentsIncluded } from './components/faq-components-included';
import { FaqLibraryComparison } from './components/faq-library-comparison';
import { FaqModernAngular } from './components/faq-modern-angular';
import { FaqOverview } from './components/faq-overview';
import { FaqProductionReadiness } from './components/faq-production-readiness';
import { FaqSsr } from './components/faq-ssr';
import { FaqTailwindV4 } from './components/faq-tailwind-v4';
import { FaqWhatIsNgBrutalism } from './components/faq-what-is-ng-brutalism';
import { FaqWhoMadeIt } from './components/faq-who-made-it';
import { FaqWhyAngular } from './components/faq-why-angular';

@Component({
  selector: 'docs-faq-page',
  imports: [
    FaqComponentsIncluded,
    FaqLibraryComparison,
    FaqModernAngular,
    FaqOverview,
    FaqProductionReadiness,
    FaqSsr,
    FaqTailwindV4,
    FaqWhatIsNgBrutalism,
    FaqWhoMadeIt,
    FaqWhyAngular,
  ],
  template: `
    <article>
      <docs-faq-overview />
      <docs-faq-what-is-ng-brutalism />
      <docs-faq-why-angular />
      <docs-faq-modern-angular />
      <docs-faq-tailwind-v4 />
      <docs-faq-library-comparison />
      <docs-faq-production-readiness />
      <docs-faq-components-included />
      <docs-faq-ssr />
      <docs-faq-who-made-it />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FaqPage {}
