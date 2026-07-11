import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbMediaItem,
  NbStack,
  NbSurface,
  type NbStackSeparator,
} from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface StackSeparatorDemo {
  readonly value: NbStackSeparator;
  readonly label: string;
}

@Component({
  selector: 'docs-stack-separators',
  imports: [NbMediaItem, NbStack, NbSurface, DocsExample],
  template: `
    <section id="separators">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Separators
      </h2>
      <p class="mb-4 font-medium">
        Use <code class="font-mono">separator</code> for simple separated
        lists. The separator padding follows the stack gap.
      </p>
      <docs-example [code]="separatorExampleCode">
        <div class="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
          @for (separator of separators; track separator.value) {
          <div nbSurface tone="yellow" radius="lg" shadow="hard" class="p-4">
            <div nbStack gap="md" [separator]="separator.value">
              <nb-media-item
                icon="/tokyo-city-escape/central-locations.png"
                title="Central Locations"
              />
              <nb-media-item
                icon="/tokyo-city-escape/guided-experiences.png"
                title="Guided Experiences"
              />
              <nb-media-item
                icon="/tokyo-city-escape/24-7-support.png"
                title="24/7 Support"
              />
            </div>
          </div>
          }
        </div>
      </docs-example>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackSeparators {
  protected readonly separatorExampleCode = `<div nbStack gap="md" separator="dashed">
  <nb-media-item icon="/icons/location.svg" title="Central Locations" />
  <nb-media-item icon="/icons/camera.svg" title="Guided Experiences" />
  <nb-media-item icon="/icons/support.svg" title="24/7 Support" />
</div>`;

  protected readonly separators = [
    { value: 'solid', label: 'solid' },
    { value: 'dashed', label: 'dashed' },
  ] satisfies readonly StackSeparatorDemo[];
}
