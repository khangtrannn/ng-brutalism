import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CheckboxAccessibility } from './components/checkbox-accessibility';
import { CheckboxApi } from './components/checkbox-api';
import { CheckboxDisabled } from './components/checkbox-disabled';
import { CheckboxHero } from './components/checkbox-hero';
import { CheckboxPreview } from './components/checkbox-preview';
import { CheckboxSizes } from './components/checkbox-sizes';
import { CheckboxTokens } from './components/checkbox-tokens';
import { CheckboxUsage } from './components/checkbox-usage';
import { CheckboxWithLabel } from './components/checkbox-with-label';

@Component({
  selector: 'docs-checkbox-page',
  imports: [
    CheckboxHero,
    CheckboxPreview,
    CheckboxUsage,
    CheckboxSizes,
    CheckboxDisabled,
    CheckboxWithLabel,
    CheckboxTokens,
    CheckboxAccessibility,
    CheckboxApi,
  ],
  template: `
    <article>
      <docs-checkbox-hero />
      <docs-checkbox-preview />
      <docs-checkbox-usage />
      <docs-checkbox-sizes />
      <docs-checkbox-disabled />
      <docs-checkbox-with-label />
      <docs-checkbox-tokens />
      <docs-checkbox-accessibility />
      <docs-checkbox-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxPage {}
