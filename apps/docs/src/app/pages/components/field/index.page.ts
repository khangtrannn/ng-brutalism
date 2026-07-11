import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FieldAccessibility } from './components/field-accessibility';
import { FieldApi } from './components/field-api';
import { FieldHero } from './components/field-hero';
import { FieldInvalidState } from './components/field-invalid-state';
import { FieldPreview } from './components/field-preview';
import { FieldTokens } from './components/field-tokens';
import { FieldUsage } from './components/field-usage';

@Component({
  selector: 'docs-field-page',
  imports: [
    FieldHero,
    FieldPreview,
    FieldUsage,
    FieldInvalidState,
    FieldTokens,
    FieldAccessibility,
    FieldApi,
  ],
  template: `
    <article>
      <docs-field-hero />
      <docs-field-preview />
      <docs-field-usage />
      <docs-field-invalid-state />
      <docs-field-tokens />
      <docs-field-accessibility />
      <docs-field-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FieldPage {}
