import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SelectAccessibility } from './components/select-accessibility';
import { SelectApi } from './components/select-api';
import { SelectDisabled } from './components/select-disabled';
import { SelectHero } from './components/select-hero';
import { SelectNativeSelect } from './components/select-native-select';
import { SelectPreview } from './components/select-preview';
import { SelectTokens } from './components/select-tokens';
import { SelectUsage } from './components/select-usage';
import { SelectWithIcon } from './components/select-with-icon';
import { SelectWithLabel } from './components/select-with-label';
import { SelectWithPrefix } from './components/select-with-prefix';

@Component({
  selector: 'docs-select-page',
  imports: [
    SelectHero,
    SelectPreview,
    SelectUsage,
    SelectWithLabel,
    SelectWithPrefix,
    SelectWithIcon,
    SelectDisabled,
    SelectNativeSelect,
    SelectTokens,
    SelectAccessibility,
    SelectApi,
  ],
  template: `
    <article>
      <docs-select-hero />
      <docs-select-preview />
      <docs-select-usage />
      <docs-select-with-label />
      <docs-select-with-prefix />
      <docs-select-with-icon />
      <docs-select-disabled />
      <docs-select-native-select />
      <docs-select-tokens />
      <docs-select-accessibility />
      <docs-select-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {}
