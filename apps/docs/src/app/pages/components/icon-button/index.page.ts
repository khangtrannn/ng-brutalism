import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconButtonAccessibility } from './components/icon-button-accessibility';
import { IconButtonApi } from './components/icon-button-api';
import { IconButtonHero } from './components/icon-button-hero';
import { IconButtonPreview } from './components/icon-button-preview';
import { IconButtonShapes } from './components/icon-button-shapes';
import { IconButtonSizes } from './components/icon-button-sizes';
import { IconButtonTokens } from './components/icon-button-tokens';
import { IconButtonTones } from './components/icon-button-tones';
import { IconButtonUsage } from './components/icon-button-usage';

@Component({
  selector: 'docs-icon-button-page',
  imports: [
    IconButtonHero,
    IconButtonPreview,
    IconButtonUsage,
    IconButtonShapes,
    IconButtonSizes,
    IconButtonTones,
    IconButtonTokens,
    IconButtonAccessibility,
    IconButtonApi,
  ],
  template: `
    <article>
      <docs-icon-button-hero />
      <docs-icon-button-preview />
      <docs-icon-button-usage />
      <docs-icon-button-shapes />
      <docs-icon-button-sizes />
      <docs-icon-button-tones />
      <docs-icon-button-tokens />
      <docs-icon-button-accessibility />
      <docs-icon-button-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconButtonPage {}
