import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ChipAccessibility } from './components/chip-accessibility';
import { ChipApi } from './components/chip-api';
import { ChipDesignTokens } from './components/chip-design-tokens';
import { ChipHero } from './components/chip-hero';
import { ChipPreview } from './components/chip-preview';
import { ChipTokens } from './components/chip-tokens';
import { ChipTones } from './components/chip-tones';
import { ChipUsage } from './components/chip-usage';
import { ChipWithIcon } from './components/chip-with-icon';

@Component({
  selector: 'docs-chip-page',
  imports: [
    ChipHero,
    ChipPreview,
    ChipUsage,
    ChipTones,
    ChipTokens,
    ChipWithIcon,
    ChipApi,
    ChipDesignTokens,
    ChipAccessibility,
  ],
  template: `
    <article>
      <docs-chip-hero />
      <docs-chip-preview />
      <docs-chip-usage />
      <docs-chip-tones />
      <docs-chip-tokens />
      <docs-chip-with-icon />
      <docs-chip-api />
      <docs-chip-design-tokens />
      <docs-chip-accessibility />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChipPage {}
