import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbCallout, type NbCalloutTone } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface CalloutToneDemo {
  readonly value: NbCalloutTone;
  readonly label: string;
  readonly sample: string;
}

@Component({
  selector: 'docs-callout-tones',
  imports: [NbCallout, DocsExample],
  template: `
    <section id="tones">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Tones</h2>
      <docs-example [code]="tonesExampleCode">
        <div
          class="grid w-full grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          @for (tone of tones; track tone.value) {
          <div nbCallout [tone]="tone.value" size="md" layout="between">
            <span>{{ tone.label }}</span>
            <span>{{ tone.sample }}</span>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutTones {
  protected readonly tonesExampleCode = `<div nbCallout tone="yellow">Yellow</div>
<div nbCallout tone="pink">Pink</div>
<div nbCallout tone="mint">Mint</div>
<div nbCallout tone="black">Black</div>`;

  protected readonly tones = [
    { value: 'yellow', label: 'yellow', sample: '$799' },
    { value: 'pink', label: 'pink', sample: '$420K' },
    { value: 'mint', label: 'mint', sample: '4.9' },
    { value: 'lavender', label: 'lavender', sample: 'EP 42' },
    { value: 'blue', label: 'blue', sample: '3:30' },
    { value: 'cream', label: 'cream', sample: '$129' },
    { value: 'white', label: 'white', sample: '$8.2K' },
    { value: 'black', label: 'black', sample: '$5K' },
    { value: 'primary', label: 'primary', sample: 'NEW' },
    { value: 'secondary', label: 'secondary', sample: 'SAVE' },
    { value: 'accent', label: 'accent', sample: 'HOT' },
    { value: 'success', label: 'success', sample: 'DONE' },
    { value: 'warning', label: 'warning', sample: 'TODAY' },
    { value: 'danger', label: 'danger', sample: 'LIVE' },
  ] satisfies readonly CalloutToneDemo[];
}
