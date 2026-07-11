import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AvatarGroupAccessibility } from './components/avatar-group-accessibility';
import { AvatarGroupApi } from './components/avatar-group-api';
import { AvatarGroupHero } from './components/avatar-group-hero';
import { AvatarGroupNoOverflow } from './components/avatar-group-no-overflow';
import { AvatarGroupPreview } from './components/avatar-group-preview';
import { AvatarGroupTokens } from './components/avatar-group-tokens';
import { AvatarGroupUsage } from './components/avatar-group-usage';

@Component({
  selector: 'docs-avatar-group-page',
  imports: [
    AvatarGroupHero,
    AvatarGroupPreview,
    AvatarGroupUsage,
    AvatarGroupNoOverflow,
    AvatarGroupTokens,
    AvatarGroupAccessibility,
    AvatarGroupApi,
  ],
  template: `
    <article>
      <docs-avatar-group-hero />
      <docs-avatar-group-preview />
      <docs-avatar-group-usage />
      <docs-avatar-group-no-overflow />
      <docs-avatar-group-tokens />
      <docs-avatar-group-accessibility />
      <docs-avatar-group-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AvatarGroupPage {}
