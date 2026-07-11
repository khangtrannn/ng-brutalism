import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AvatarAccessibility } from './components/avatar-accessibility';
import { AvatarApi } from './components/avatar-api';
import { AvatarFallback } from './components/avatar-fallback';
import { AvatarHero } from './components/avatar-hero';
import { AvatarPreview } from './components/avatar-preview';
import { AvatarTokens } from './components/avatar-tokens';
import { AvatarUsage } from './components/avatar-usage';

@Component({
  selector: 'docs-avatar-page',
  imports: [
    AvatarHero,
    AvatarPreview,
    AvatarUsage,
    AvatarFallback,
    AvatarTokens,
    AvatarAccessibility,
    AvatarApi,
  ],
  template: `
    <article>
      <docs-avatar-hero />
      <docs-avatar-preview />
      <docs-avatar-usage />
      <docs-avatar-fallback />
      <docs-avatar-tokens />
      <docs-avatar-accessibility />
      <docs-avatar-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AvatarPage {}
