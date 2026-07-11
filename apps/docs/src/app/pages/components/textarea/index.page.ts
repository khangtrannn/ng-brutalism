import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TextareaAccessibility } from './components/textarea-accessibility';
import { TextareaApi } from './components/textarea-api';
import { TextareaDisabled } from './components/textarea-disabled';
import { TextareaHero } from './components/textarea-hero';
import { TextareaPreview } from './components/textarea-preview';
import { TextareaSizes } from './components/textarea-sizes';
import { TextareaTokens } from './components/textarea-tokens';
import { TextareaUsage } from './components/textarea-usage';
import { TextareaWithLabel } from './components/textarea-with-label';

@Component({
  selector: 'docs-textarea-page',
  imports: [
    TextareaHero,
    TextareaPreview,
    TextareaUsage,
    TextareaSizes,
    TextareaDisabled,
    TextareaWithLabel,
    TextareaTokens,
    TextareaAccessibility,
    TextareaApi,
  ],
  template: `
    <article>
      <docs-textarea-hero />
      <docs-textarea-preview />
      <docs-textarea-usage />
      <docs-textarea-sizes />
      <docs-textarea-disabled />
      <docs-textarea-with-label />
      <docs-textarea-tokens />
      <docs-textarea-accessibility />
      <docs-textarea-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextareaPage {}
