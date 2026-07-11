import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SectionAccessibility } from './components/section-accessibility';
import { SectionApi } from './components/section-api';
import { SectionBorderStyles } from './components/section-border-styles';
import { SectionBorders } from './components/section-borders';
import { SectionComposition } from './components/section-composition';
import { SectionHero } from './components/section-hero';
import { SectionLayouts } from './components/section-layouts';
import { SectionPaddings } from './components/section-paddings';
import { SectionPreview } from './components/section-preview';
import { SectionTokens } from './components/section-tokens';
import { SectionUsage } from './components/section-usage';

@Component({
  selector: 'docs-section-page',
  imports: [
    SectionHero,
    SectionPreview,
    SectionUsage,
    SectionPaddings,
    SectionBorders,
    SectionBorderStyles,
    SectionLayouts,
    SectionComposition,
    SectionTokens,
    SectionAccessibility,
    SectionApi,
  ],
  template: `
    <article>
      <docs-section-hero />
      <docs-section-preview />
      <docs-section-usage />
      <docs-section-paddings />
      <docs-section-borders />
      <docs-section-border-styles />
      <docs-section-layouts />
      <docs-section-composition />
      <docs-section-tokens />
      <docs-section-accessibility />
      <docs-section-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SectionPage {}
