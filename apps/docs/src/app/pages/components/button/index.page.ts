import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonAccessibility } from './components/button-accessibility';
import { ButtonAnchorUsage } from './components/button-anchor-usage';
import { ButtonApi } from './components/button-api';
import { ButtonCta } from './components/button-cta';
import { ButtonDisabled } from './components/button-disabled';
import { ButtonFullWidth } from './components/button-full-width';
import { ButtonHero } from './components/button-hero';
import { ButtonPreview } from './components/button-preview';
import { ButtonSizes } from './components/button-sizes';
import { ButtonTokens } from './components/button-tokens';
import { ButtonTones } from './components/button-tones';
import { ButtonTrailingIcon } from './components/button-trailing-icon';
import { ButtonUsage } from './components/button-usage';

@Component({
  selector: 'docs-button-page',
  imports: [
    ButtonHero,
    ButtonPreview,
    ButtonUsage,
    ButtonTones,
    ButtonSizes,
    ButtonCta,
    ButtonTrailingIcon,
    ButtonFullWidth,
    ButtonDisabled,
    ButtonAnchorUsage,
    ButtonTokens,
    ButtonAccessibility,
    ButtonApi,
  ],
  template: `
    <article>
      <docs-button-hero />
      <docs-button-preview />
      <docs-button-usage />
      <docs-button-tones />
      <docs-button-sizes />
      <docs-button-cta />
      <docs-button-trailing-icon />
      <docs-button-full-width />
      <docs-button-disabled />
      <docs-button-anchor-usage />
      <docs-button-tokens />
      <docs-button-accessibility />
      <docs-button-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPage {}
