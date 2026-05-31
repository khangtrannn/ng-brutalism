import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbHalftone,
  NbIcon,
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
    NbCluster,
    NbDisplay,
    NbHalftone,
    NbIcon,
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
  styles: `
    [nbChip] {
      --nb-chip-radius: 6px;
      --nb-chip-shadow: none;
    }
  `,
  template: `
    <div nbCluster justify="center" class="overflow-visible px-6 py-8">
      <!-- Plain layout wrapper only. Do not use nbSection here. -->
      <div class="relative w-full overflow-visible">
        <div
          nbSurface
          clip
          border="strong"
          shadow="hard"
          radius="xl"
          class="relative z-10 w-full overflow-hidden"
          style="--nb-surface-bg: #fffaf2"
        >
          <!-- Main content section -->
          <div nbSection padding="lg" class="relative z-10">
            <div nbStack gap="lg">
              <!-- Top bar -->
              <div nbCluster gap="md" align="center" justify="between">
                <span
                  nbChip
                  padding="lg"
                  tone="pink"
                  class="uppercase font-black tracking-wide"
                >
                  <span
                    nbIcon
                    src="/podcast-card/microphone.svg"
                    size="sm"
                    decorative
                  ></span>
                  Podcast
                </span>
              </div>

              <!-- Brand row -->
              <div nbCluster gap="lg" align="center">
                <img
                  src="/podcast-card/bfm-logo.png"
                  alt="Build Loud FM logo"
                  class="size-20"
                />

                <div nbStack gap="xs" align="start">
                  <span nbText size="3xl" weight="extrabold">
                    Build Loud FM
                  </span>
                  <span
                    class="block h-1.5 w-28 rounded-full bg-pink-400"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>

              <!-- Episode badge -->
              <div class="relative w-fit">
                <div
                  nbCallout
                  tone="yellow"
                  size="xl"
                  shadow="hard"
                  class="w-fit uppercase tracking-tight [--nb-callout-radius:6px]"
                >
                  EP 42
                </div>
              </div>

              <!-- Hero title -->
              <div>
                <h1 nbDisplay size="xl" leading="display">
                  DESIGN<br />SYSTEMS<br />THAT SCALE
                </h1>

                <span
                  class="mt-5 block h-1.5 w-28 rounded-full bg-pink-400"
                  aria-hidden="true"
                ></span>
              </div>

              <!-- Metadata chips -->
              <div nbCluster gap="sm">
                <span
                  nbChip
                  tone="mint"
                  padding="lg"
                  class="uppercase text-sm font-black"
                >
                  <span
                    nbIcon
                    src="/podcast-card/clock.svg"
                    size="sm"
                    decorative
                  ></span>
                  45 MIN
                </span>

                <span
                  nbChip
                  tone="lavender"
                  class="uppercase text-sm font-black"
                  padding="lg"
                >
                  <span
                    nbIcon
                    src="/podcast-card/sparkle.svg"
                    size="sm"
                    decorative
                  ></span>
                  NEW
                </span>

                <span
                  nbChip
                  tone="pink"
                  padding="lg"
                  class="uppercase text-sm font-black"
                >
                  <span
                    nbIcon
                    src="/podcast-card/user.svg"
                    size="sm"
                    decorative
                  ></span>
                  UX
                </span>
              </div>

              <!-- Description -->
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

                <!-- Small flight doodle -->
                <img
                  src="/podcast-card/flight-doodle.svg"
                  alt=""
                  aria-hidden="true"
                  class="z-0 hidden sm:block h-16 w-27"
                />
              </div>
            </div>
          </div>

          <!-- Host / player / actions section -->
          <div nbSection border="top" padding="lg" class="z-10">
            <div nbStack gap="md" class="relative z-10">
              <div nbCluster gap="lg" align="start">
                <img
                  src="/podcast-card/avatar.png"
                  alt="Kai Nguyen"
                  class="size-30"
                />

                <div nbStack gap="sm" align="start" class="flex-1">
                  <div nbStack gap="xs" align="start" class="relative w-full">
                    <span nbText size="xl" weight="extrabold">Kai Nguyen</span>
                    <span nbText size="md" tone="muted">Host</span>

                    <div nbCluster gap="sm" align="center">
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

                    <nb-halftone
                      position="bottom-right"
                      [rows]="6"
                      [cols]="6"
                      class="opacity-90"
                    />
                  </div>

                  <img
                    src="/podcast-card/timeline.png"
                    alt="Episode player — playing at 22:15 of 45:00"
                    class="w-full"
                  />
                </div>
              </div>

              <div nbCluster gap="md" align="center" justify="between">
                <button
                  nbButton
                  tone="lavender"
                  size="xl"
                  radius="md"
                  weight="black"
                  transform="uppercase"
                  tracking="wide"
                  class="min-w-0 flex-1 text-3xl!"
                >
                  Listen Now

                  <span
                    nbButtonTrailingIcon
                    shape="circle"
                    tone="inverse"
                    size="md"
                  >
                    <span
                      nbIcon
                      src="/podcast-card/arrow.svg"
                      size="sm"
                      decorative
                    ></span>
                  </span>
                </button>

                <button
                  nbIconButton
                  radius="md"
                  shape="square"
                  size="lg"
                  variant="neutral"
                  type="button"
                  aria-label="Save episode"
                  class="shrink-0"
                >
                  <span
                    nbIcon
                    src="/podcast-card/bookmark.svg"
                    size="md"
                    decorative
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Blue sparkle inside the card -->
          <img
            src="/podcast-card/star-burst.svg"
            alt=""
            aria-hidden="true"
            class="absolute right-10 top-[25%] z-0 size-10.5"
          />
        </div>

        <!-- Stickers live outside nbSurface so they can overflow safely. -->
        <nb-sticker
          shape="star"
          tone="lavender"
          aria-label="Happy episode sticker"
          class="absolute top-2 right-2 z-20"
          [rotate]="10"
        >
          <nb-sticker-face />
        </nb-sticker>

        <!-- Pink splat peeks out behind the bottom-left corner. -->
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastCard {}
