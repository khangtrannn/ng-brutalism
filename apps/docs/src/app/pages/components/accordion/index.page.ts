import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AccordionAccessibility } from './components/accordion-accessibility';
import { AccordionApi } from './components/accordion-api';
import { AccordionControlled } from './components/accordion-controlled';
import { AccordionDisabled } from './components/accordion-disabled';
import { AccordionHero } from './components/accordion-hero';
import { AccordionMultiple } from './components/accordion-multiple';
import { AccordionPreview } from './components/accordion-preview';
import { AccordionTokens } from './components/accordion-tokens';
import { AccordionUsage } from './components/accordion-usage';

@Component({
  selector: 'docs-accordion-page',
  imports: [
    AccordionHero,
    AccordionPreview,
    AccordionUsage,
    AccordionMultiple,
    AccordionControlled,
    AccordionDisabled,
    AccordionTokens,
    AccordionAccessibility,
    AccordionApi,
  ],
  template: `
    <article style="--nb-accordion-trigger-bg: var(--nb-yellow)">
      <docs-accordion-hero />
      <docs-accordion-preview />
      <docs-accordion-usage />
      <docs-accordion-multiple />
      <docs-accordion-controlled />
      <docs-accordion-disabled />
      <docs-accordion-tokens />
      <docs-accordion-accessibility />
      <docs-accordion-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {}
