import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbChipGroup,
  NbChipTone,
  NbCluster,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbSection,
  NbSplit,
  NbStack,
  NbStatusDot,
  NbSticker,
  NbStickerFace,
  NbSurface,
  NbText,
} from '@ng-brutalism/ui';

@Component({
  selector: 'recipe-podcast-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbCallout,
    NbChip,
    NbChipGroup,
    NbCluster,
    NbDisplay,
    NbHalftone,
    NbIconButton,
    NbSection,
    NbSplit,
    NbStack,
    NbStatusDot,
    NbSticker,
    NbStickerFace,
    NbSurface,
    NbText,
  ],
  template: `
    <div
      nbCluster
      justify="center"
      padding="lg"
      class="podcast-stage w-full overflow-visible"
    >
      <div class="relative mx-auto w-full max-w-xl overflow-visible">
        <div
          nbSurface
          clip
          tone="cream"
          border="strong"
          shadow="hard"
          radius="xl"
          class="relative z-10 w-full"
        >
          <div nbSection padding="lg" class="relative z-10">
            <div nbStack gap="lg">
              <div
                nbCluster
                gap="md"
                align="center"
                justify="between"
                padding="none"
              >
                <span
                  nbChip
                  padding="lg"
                  tone="pink"
                  radius="sm"
                  shadow="none"
                  icon="/podcast-card/microphone.svg"
                  class="uppercase font-black tracking-wide"
                >
                  Podcast
                </span>
              </div>

              <div nbCluster gap="lg" align="center" padding="none">
                <img
                  src="/podcast-card/bfm-logo.png"
                  alt="Build Loud FM logo"
                  class="size-20"
                />

                <span nbText size="3xl" weight="extrabold" underline="bar">
                  Build Loud FM
                </span>
              </div>

              <div class="relative w-fit">
                <div
                  nbCallout
                  tone="yellow"
                  size="lg"
                  shadow="hard"
                  radius="sm"
                  class="w-fit uppercase tracking-tight"
                >
                  EP 42
                </div>
              </div>

              <h1
                nbDisplay
                size="xl"
                leading="display"
                underline="bar"
                underlineGap="lg"
              >
                DESIGN<br />SYSTEMS<br />THAT SCALE
              </h1>

              <div
                nbChipGroup
                gap="sm"
                radius="sm"
                shadow="none"
                transform="uppercase"
              >
                @for (stat of stats; track stat.label) {
                  <span
                    nbChip
                    [tone]="stat.tone"
                    padding="lg"
                    [icon]="stat.icon"
                    class="text-sm font-black"
                  >
                    {{ stat.label }}
                  </span>
                }
              </div>

              <div nbSplit ratio="fill:auto">
                <p
                  nbText
                  size="md"
                  weight="medium"
                  measure="md"
                  leading="tight"
                >
                  Practical strategies for building design systems that grow
                  with your product.
                </p>

                <img
                  src="/podcast-card/flight-doodle.svg"
                  alt=""
                  aria-hidden="true"
                  class="z-0 hidden sm:block h-16 w-27"
                />
              </div>
            </div>
          </div>

          <div nbSection divider="top" padding="lg" class="z-10">
            <div nbStack gap="md" class="relative z-10">
              <div nbCluster gap="lg" align="start" padding="none">
                <img
                  src="/podcast-card/avatar.png"
                  alt="Kai Nguyen"
                  class="size-30"
                />

                <div nbStack gap="sm" align="start" class="flex-1">
                  <div nbStack gap="xs" align="start" class="relative w-full">
                    <span nbText size="xl" weight="extrabold">Kai Nguyen</span>
                    <span nbText size="md" tone="muted">Host</span>

                    <div nbCluster gap="sm" align="center" padding="none">
                      <span nbStatusDot state="online"></span>
                      <span
                        nbText
                        size="xs"
                        weight="bold"
                        transform="uppercase"
                        tracking="wide"
                      >
                        On Air
                      </span>
                    </div>

                    <div nbHalftone class="absolute bottom-0 right-0"></div>
                  </div>

                  <img
                    src="/podcast-card/timeline.png"
                    alt="Episode player — playing at 22:15 of 45:00"
                    class="w-full"
                  />
                </div>
              </div>

              <div
                nbCluster
                gap="md"
                align="center"
                justify="between"
                padding="none"
              >
                <button
                  nbButton
                  tone="lavender"
                  size="xl"
                  radius="md"
                  class="flex-1"
                >
                  <span
                    nbText
                    size="3xl"
                    weight="black"
                    transform="uppercase"
                    tracking="wide"
                  >
                    Listen Now
                  </span>

                  <span
                    nbButtonTrailingIcon
                    shape="circle"
                    tone="inverse"
                    size="md"
                    icon="/podcast-card/arrow.svg"
                  ></span>
                </button>

                <button
                  nbIconButton
                  shape="square"
                  size="xl"
                  radius="md"
                  tone="background"
                  type="button"
                  aria-label="Save episode"
                  icon="/podcast-card/bookmark.svg"
                ></button>
              </div>
            </div>
          </div>

          <img
            src="/podcast-card/star-burst.svg"
            alt=""
            aria-hidden="true"
            class="absolute right-10 top-[25%] z-0 size-10.5"
          />
        </div>

        <nb-sticker
          shape="star"
          tone="lavender"
          aria-label="Happy episode sticker"
          class="absolute top-2 right-2 z-20"
          [rotate]="10"
        >
          <nb-sticker-face />
        </nb-sticker>

        <nb-sticker
          shape="splat"
          tone="pink"
          decorative
          class="absolute bottom-5 -left-9 z-0"
          [rotate]="-12"
        ></nb-sticker>
      </div>
    </div>
  `,
  styles: `
    :host {
      --podcast-paper-grid: #eadfca;
      display: block;
    }

    .podcast-stage {
      background-color: #fff8e8;
      background-image:
        linear-gradient(to right, var(--podcast-paper-grid) 1px, transparent 1px),
        linear-gradient(to bottom, var(--podcast-paper-grid) 1px, transparent 1px);
      background-size: 28px 28px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastCard {
  protected readonly stats = [
    {
      label: '45 MIN',
      tone: 'mint',
      icon: '/podcast-card/clock.svg',
    },
    {
      label: 'NEW',
      tone: 'lavender',
      icon: '/podcast-card/sparkle.svg',
    },
    {
      label: 'UX',
      tone: 'pink',
      icon: '/podcast-card/user.svg',
    }
  ] satisfies ReadonlyArray<{
    label: string;
    tone: NbChipTone;
    icon: string;
  }>;
}
