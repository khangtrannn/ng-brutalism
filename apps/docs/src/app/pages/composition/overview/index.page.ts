import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbStack } from '@ng-brutalism/ui';

import { CompositionOverviewApiLanguage } from './components/overview-api-language';
import { CompositionOverviewBeforeAfter } from './components/overview-before-after';
import { CompositionOverviewCustomization } from './components/overview-customization';
import { CompositionOverviewDecisionGuide } from './components/overview-decision-guide';
import { CompositionOverviewExample } from './components/overview-example';
import { CompositionOverviewExplore } from './components/overview-explore';
import { CompositionOverviewMentalModel } from './components/overview-mental-model';
import { CompositionOverviewOverview } from './components/overview-overview';

@Component({
  selector: 'docs-composition-overview-page',
  imports: [
    NbStack,
    CompositionOverviewOverview,
    CompositionOverviewMentalModel,
    CompositionOverviewDecisionGuide,
    CompositionOverviewExample,
    CompositionOverviewBeforeAfter,
    CompositionOverviewApiLanguage,
    CompositionOverviewCustomization,
    CompositionOverviewExplore,
  ],
  template: `
    <article nbStack gap="2xl">
      <docs-composition-overview-overview />
      <docs-composition-overview-mental-model />
      <docs-composition-overview-decision-guide />
      <docs-composition-overview-example />
      <docs-composition-overview-before-after />
      <docs-composition-overview-api-language />
      <docs-composition-overview-customization />
      <docs-composition-overview-explore />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompositionOverviewPage {}
