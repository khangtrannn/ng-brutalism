import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SeparatorAccessibility } from './components/separator-accessibility';
import { SeparatorApi } from './components/separator-api';
import { SeparatorCustomColor } from './components/separator-custom-color';
import { SeparatorHero } from './components/separator-hero';
import { SeparatorOrientation } from './components/separator-orientation';
import { SeparatorPreview } from './components/separator-preview';
import { SeparatorTokens } from './components/separator-tokens';
import { SeparatorUsage } from './components/separator-usage';
import { SeparatorVariants } from './components/separator-variants';

@Component({
  selector: 'docs-separator-page',
  imports: [
    SeparatorHero,
    SeparatorPreview,
    SeparatorUsage,
    SeparatorVariants,
    SeparatorOrientation,
    SeparatorCustomColor,
    SeparatorTokens,
    SeparatorAccessibility,
    SeparatorApi,
  ],
  template: `
    <article>
      <docs-separator-hero />
      <docs-separator-preview />
      <docs-separator-usage />
      <docs-separator-variants />
      <docs-separator-orientation />
      <docs-separator-custom-color />
      <docs-separator-tokens />
      <docs-separator-accessibility />
      <docs-separator-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SeparatorPage {}
