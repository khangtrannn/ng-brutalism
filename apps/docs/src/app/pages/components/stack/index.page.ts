import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StackAccessibility } from './components/stack-accessibility';
import { StackAlignment } from './components/stack-alignment';
import { StackApi } from './components/stack-api';
import { StackGaps } from './components/stack-gaps';
import { StackHero } from './components/stack-hero';
import { StackJustification } from './components/stack-justification';
import { StackPreview } from './components/stack-preview';
import { StackResponsive } from './components/stack-responsive';
import { StackSeparators } from './components/stack-separators';
import { StackTokens } from './components/stack-tokens';
import { StackUsage } from './components/stack-usage';

@Component({
  selector: 'docs-stack-page',
  imports: [
    StackHero,
    StackPreview,
    StackUsage,
    StackGaps,
    StackAlignment,
    StackJustification,
    StackSeparators,
    StackResponsive,
    StackTokens,
    StackAccessibility,
    StackApi,
  ],
  template: `
    <article>
      <docs-stack-hero />
      <docs-stack-preview />
      <docs-stack-usage />
      <docs-stack-gaps />
      <docs-stack-alignment />
      <docs-stack-justification />
      <docs-stack-separators />
      <docs-stack-responsive />
      <docs-stack-tokens />
      <docs-stack-accessibility />
      <docs-stack-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackPage {}
