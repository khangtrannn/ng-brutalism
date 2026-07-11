import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WithoutTailwindManualSetup } from './components/without-tailwind-manual-setup';
import { WithoutTailwindOverview } from './components/without-tailwind-overview';
import { WithoutTailwindWhatYouLose } from './components/without-tailwind-what-you-lose';
import { WithoutTailwindWhyOptional } from './components/without-tailwind-why-optional';

@Component({
  selector: 'docs-without-tailwind-page',
  imports: [
    WithoutTailwindManualSetup,
    WithoutTailwindOverview,
    WithoutTailwindWhatYouLose,
    WithoutTailwindWhyOptional,
  ],
  template: `
    <article>
      <docs-without-tailwind-overview />
      <docs-without-tailwind-why-optional />
      <docs-without-tailwind-manual-setup />
      <docs-without-tailwind-what-you-lose />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WithoutTailwindPage {}
