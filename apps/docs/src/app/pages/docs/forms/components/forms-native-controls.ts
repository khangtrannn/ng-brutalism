import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-forms-native-controls',
  imports: [DocsCodeBlock],
  template: `
    <section id="native-controls">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Native-element controls
      </h2>
      <p class="mb-4 font-medium">
        <code class="font-mono">nbInput</code>,
        <code class="font-mono">nbTextarea</code>, and
        <code class="font-mono">nbCheckbox</code> are directives on real
        <code class="font-mono">&lt;input&gt;</code>/<code class="font-mono"
          >&lt;textarea&gt;</code
        >
        elements, so Angular's own
        <code class="font-mono">DefaultValueAccessor</code>
        already handles the value/touched/dirty round-trip - no
        ng-brutalism-specific wiring needed there.
      </p>
      <docs-code-block title="Template" [code]="nativeExampleCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsNativeControls {
  protected readonly nativeExampleCode = `<input nbInput formControlName="email" type="email" />
<textarea nbTextarea formControlName="bio"></textarea>
<input type="checkbox" nbCheckbox formControlName="agree" />`;
}
