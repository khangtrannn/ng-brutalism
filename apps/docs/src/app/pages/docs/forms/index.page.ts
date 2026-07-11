import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormsFieldLinking } from './components/forms-field-linking';
import { FormsNativeControls } from './components/forms-native-controls';
import { FormsOverview } from './components/forms-overview';
import { FormsSelectCva } from './components/forms-select-cva';
import { FormsValidationStates } from './components/forms-validation-states';

@Component({
  selector: 'docs-forms-page',
  imports: [
    FormsFieldLinking,
    FormsNativeControls,
    FormsOverview,
    FormsSelectCva,
    FormsValidationStates,
  ],
  template: `
    <article>
      <docs-forms-overview />
      <docs-forms-native-controls />
      <docs-forms-select-cva />
      <docs-forms-field-linking />
      <docs-forms-validation-states />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormsPage {}
