import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbIcon,
  NbMediaItem,
  NbMediaItemTitle,
  NbSection,
  NbSplit,
  NbStack,
  NbSticker,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

@Component({
  selector: 'recipe-job-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbCallout,
    NbChip,
    NbCluster,
    NbDisplay,
    NbIcon,
    NbMediaItem,
    NbMediaItemTitle,
    NbSection,
    NbSplit,
    NbStack,
    NbSticker,
    NbSurface,
    NbText,
  ],
  template: `
    <div class="flex justify-center">
      <div
        nbSurface
        clip
        border="strong"
        shadow="hard"
        radius="xl"
        class="relative w-full"
        style="--nb-surface-bg: #faf8ff"
      >
        <div
          nbSplit
          ratio="2:1"
          gap="xl"
          padding="lg"
          collapse="md"
          divider="solid"
        >
          <div nbStack gap="lg">
            <div nbCluster gap="md" align="center">
              <div
                class="flex size-14 shrink-0 items-center justify-center rounded-xl border-2 border-(--nb-border) bg-[#0e47df] text-white shadow-[3px_3px_0_0_var(--nb-shadow)]"
                aria-hidden="true"
              >
                <span
                  nbIcon
                  src="/tokyo-city-escape/nb-star-fill.svg"
                  tone="inverse"
                  size="lg"
                  decorative
                ></span>
              </div>

              <div nbStack gap="xs" align="start">
                <span nbText size="xl" weight="extrabold">Inspectorio</span>
                <span nbText size="sm" tone="muted">Ho Chi Minh City</span>
              </div>
            </div>

            <h1 nbDisplay class="uppercase mb-0!">
              Senior<br />Frontend<br />Engineer
            </h1>

            <p nbText size="md" weight="medium" tone="muted" measure="md">
              Build delightful UI systems and scalable web experiences for a
              global team.
            </p>
          </div>

          <div nbStack gap="lg" align="start" class="shrink-0">
            <div
              nbStack
              gap="sm"
              align="start"
              class="[--nb-chip-radius:4px] [--nb-chip-shadow:none] uppercase tracking-wide"
            >
              <span nbChip tone="mint">
                <span
                  nbIcon
                  src="/tokyo-city-escape/nb-plane-fill.svg"
                  size="sm"
                  decorative
                ></span>
                Remote
              </span>

              <span nbChip tone="lavender">
                <span
                  nbIcon
                  src="/tokyo-city-escape/nb-hotel-fill.svg"
                  size="sm"
                  decorative
                ></span>
                Full-time
              </span>

              <span nbChip tone="pink">
                <span
                  nbIcon
                  src="/tokyo-city-escape/nb-star-fill.svg"
                  size="sm"
                  decorative
                ></span>
                Urgent
              </span>
            </div>

            <div nbCallout tone="yellow" size="xl" shadow="hard">$120K</div>
          </div>
        </div>

        <div nbSection border="top" padding="lg">
          <div nbSplit ratio="2:1" gap="lg" collapse="md">
            <div
              nbCluster
              gap="lg"
              align="center"
              divider="dashed"
              class="[--nb-media-item-title-size:12px]"
            >
              <nb-media-item icon="/icons/location.png">
                <span nbMediaItemTitle>HCMC<br />Remote</span>
              </nb-media-item>

              <nb-media-item icon="/icons/star.png">
                <span nbMediaItemTitle>5+<br />Years Exp</span>
              </nb-media-item>

              <nb-media-item icon="/icons/world.png">
                <span nbMediaItemTitle>International<br />Team</span>
              </nb-media-item>
            </div>

            <button
              nbButton
              tone="lavender"
              size="xl"
              radius="md"
              weight="black"
              transform="uppercase"
              tracking="wide"
            >
              Apply Now

              <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
                <span
                  nbIcon
                  src="/tokyo-city-escape/nb-arrow-right.svg"
                  size="sm"
                  decorative
                ></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCard {}
