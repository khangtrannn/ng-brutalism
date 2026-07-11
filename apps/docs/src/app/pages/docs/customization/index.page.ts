import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CustomizationMentalModel } from './components/customization-mental-model';
import { CustomizationOverview } from './components/customization-overview';
import { CustomizationPrecedence } from './components/customization-precedence';
import { CustomizationScope } from './components/customization-scope';
import { CustomizationTone } from './components/customization-tone';

@Component({
  selector: 'docs-customization-page',
  imports: [
    CustomizationMentalModel,
    CustomizationOverview,
    CustomizationPrecedence,
    CustomizationScope,
    CustomizationTone,
  ],
  template: `
    <article>
      <docs-customization-overview />
      <docs-customization-mental-model />
      <docs-customization-precedence />
      <docs-customization-scope />
      <docs-customization-tone />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomizationPage {}
