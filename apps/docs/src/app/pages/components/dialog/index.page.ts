import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DialogAccessibility } from './components/dialog-accessibility';
import { DialogApi } from './components/dialog-api';
import { DialogHero } from './components/dialog-hero';
import { DialogPreview } from './components/dialog-preview';
import { DialogTokens } from './components/dialog-tokens';
import { DialogUsage } from './components/dialog-usage';

@Component({
  selector: 'docs-dialog-page',
  imports: [
    DialogHero,
    DialogPreview,
    DialogUsage,
    DialogTokens,
    DialogAccessibility,
    DialogApi,
  ],
  template: `
    <article>
      <docs-dialog-hero />
      <docs-dialog-preview />
      <docs-dialog-usage />
      <docs-dialog-tokens />
      <docs-dialog-accessibility />
      <docs-dialog-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogPage {}
