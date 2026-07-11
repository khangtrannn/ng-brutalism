import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InputAccessibility } from './components/input-accessibility';
import { InputApi } from './components/input-api';
import { InputDisabled } from './components/input-disabled';
import { InputFile } from './components/input-file';
import { InputHero } from './components/input-hero';
import { InputPreview } from './components/input-preview';
import { InputSizes } from './components/input-sizes';
import { InputTokens } from './components/input-tokens';
import { InputUsage } from './components/input-usage';
import { InputWithButton } from './components/input-with-button';
import { InputWithLabel } from './components/input-with-label';

@Component({
  selector: 'docs-input-page',
  imports: [
    InputHero,
    InputPreview,
    InputUsage,
    InputSizes,
    InputDisabled,
    InputWithLabel,
    InputWithButton,
    InputFile,
    InputTokens,
    InputAccessibility,
    InputApi,
  ],
  template: `
    <article>
      <docs-input-hero />
      <docs-input-preview />
      <docs-input-usage />
      <docs-input-sizes />
      <docs-input-disabled />
      <docs-input-with-label />
      <docs-input-with-button />
      <docs-input-file />
      <docs-input-tokens />
      <docs-input-accessibility />
      <docs-input-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPage {}
