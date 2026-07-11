import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AccessibilityApgPatterns } from './components/accessibility-apg-patterns';
import { AccessibilityKeyboardSupport } from './components/accessibility-keyboard-support';
import { AccessibilityOverview } from './components/accessibility-overview';
import { AccessibilityTestingPolicy } from './components/accessibility-testing-policy';

@Component({
  selector: 'docs-accessibility-page',
  imports: [
    AccessibilityApgPatterns,
    AccessibilityKeyboardSupport,
    AccessibilityOverview,
    AccessibilityTestingPolicy,
  ],
  template: `
    <article>
      <docs-accessibility-overview />
      <docs-accessibility-apg-patterns />
      <docs-accessibility-testing-policy />
      <docs-accessibility-keyboard-support />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccessibilityPage {}
