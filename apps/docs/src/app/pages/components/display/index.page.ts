import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DisplayAccessibility } from './components/display-accessibility';
import { DisplayAnyElement } from './components/display-any-element';
import { DisplayApi } from './components/display-api';
import { DisplayCustomSize } from './components/display-custom-size';
import { DisplayHero } from './components/display-hero';
import { DisplayPreview } from './components/display-preview';
import { DisplaySizes } from './components/display-sizes';
import { DisplayTokens } from './components/display-tokens';
import { DisplayUnderline } from './components/display-underline';
import { DisplayUsage } from './components/display-usage';

@Component({
  selector: 'docs-display-page',
  imports: [
    DisplayHero,
    DisplayPreview,
    DisplayUsage,
    DisplaySizes,
    DisplayCustomSize,
    DisplayAnyElement,
    DisplayUnderline,
    DisplayTokens,
    DisplayAccessibility,
    DisplayApi,
  ],
  template: `
    <article>
      <docs-display-hero />
      <docs-display-preview />
      <docs-display-usage />
      <docs-display-sizes />
      <docs-display-custom-size />
      <docs-display-any-element />
      <docs-display-underline />
      <docs-display-tokens />
      <docs-display-accessibility />
      <docs-display-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisplayPage {}
