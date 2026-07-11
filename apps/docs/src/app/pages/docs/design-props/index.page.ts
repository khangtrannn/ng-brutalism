import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DesignPropsArchetypes } from './components/design-props-archetypes';
import { DesignPropsExample } from './components/design-props-example';
import { DesignPropsOverview } from './components/design-props-overview';
import { DesignPropsVocabulary } from './components/design-props-vocabulary';

@Component({
  selector: 'docs-design-props-page',
  imports: [
    DesignPropsArchetypes,
    DesignPropsExample,
    DesignPropsOverview,
    DesignPropsVocabulary,
  ],
  template: `
    <article>
      <docs-design-props-overview />
      <docs-design-props-vocabulary />
      <docs-design-props-archetypes />
      <docs-design-props-example />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DesignPropsPage {}
