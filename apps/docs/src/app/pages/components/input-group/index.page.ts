import { ChangeDetectionStrategy, Component } from '@angular/core';

import { InputGroupAccessibility } from './components/input-group-accessibility';
import { InputGroupApi } from './components/input-group-api';
import { InputGroupDisabled } from './components/input-group-disabled';
import { InputGroupHero } from './components/input-group-hero';
import { InputGroupPrefixSuffix } from './components/input-group-prefix-suffix';
import { InputGroupPreview } from './components/input-group-preview';
import { InputGroupTextarea } from './components/input-group-textarea';
import { InputGroupTokens } from './components/input-group-tokens';
import { InputGroupUsage } from './components/input-group-usage';
import { InputGroupWithLabel } from './components/input-group-with-label';

@Component({
  selector: 'docs-input-group-page',
  imports: [
    InputGroupHero,
    InputGroupPreview,
    InputGroupUsage,
    InputGroupPrefixSuffix,
    InputGroupWithLabel,
    InputGroupTextarea,
    InputGroupDisabled,
    InputGroupTokens,
    InputGroupAccessibility,
    InputGroupApi,
  ],
  template: `
    <article>
      <docs-input-group-hero />
      <docs-input-group-preview />
      <docs-input-group-usage />
      <docs-input-group-prefix-suffix />
      <docs-input-group-with-label />
      <docs-input-group-textarea />
      <docs-input-group-disabled />
      <docs-input-group-tokens />
      <docs-input-group-accessibility />
      <docs-input-group-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputGroupPage {}
