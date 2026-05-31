import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbCluster,
  NbDisplay,
  NbHalftone,
  NbIcon,
  NbIconButton,
  NbSection,
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
    NbChip,
    NbCluster,
    NbDisplay,
    NbHalftone,
    NbIcon,
    NbIconButton,
    NbSection,
    NbStack,
    NbStatusDot,
    NbSticker,
    NbStickerFace,
    NbSurface,
    NbText,
  ],
  template: `
    <div class="flex justify-center">
      <!-- Outer wrapper: hosts decorative stickers that overflow the card edges -->
      <div class="relative w-full max-w-md">
        <div
          nbSurface
          clip
          border="strong"
          shadow="hard"
          radius="xl"
          class="relative w-full"
          style="--nb-surface-bg: #fef9f5"
        >
          <!-- Header: Podcast chip + menu dots -->
          <div
            nbCluster
            gap="md"
            align="center"
            justify="between"
            padding="lg"
          >
            <span nbChip tone="pink" class="uppercase font-bold text-sm">
              <span
                nbIcon
                src="/podcast-card/microphone.svg"
                size="sm"
                decorative
              ></span>
              Podcast
            </span>

            <button
              type="button"
              aria-label="Episode menu"
              class="flex items-center gap-1.5 px-1"
            >
              <span class="size-1.5 rounded-full bg-black"></span>
              <span class="size-1.5 rounded-full bg-black"></span>
              <span class="size-1.5 rounded-full bg-black"></span>
            </button>
          </div>

          <!-- Brand row: Logo + text + underline -->
          <div nbSection border="top" padding="lg" class="pb-0">
            <div nbCluster gap="md" align="center">
              <img
                src="/podcast-card/bfm-logo.png"
                alt="Build Loud FM logo"
                class="w-12 h-12 border-2 border-black rounded-lg"
              />
              <span nbText size="xl" weight="extrabold">Build Loud FM</span>
            </div>
            <div class="h-1.5 w-28 bg-pink-500 mt-2 mb-0!"></div>
          </div>

          <!-- Episode badge -->
          <div nbSection padding="lg" class="pt-4 pb-0">
            <span nbChip tone="yellow" class="uppercase font-black text-xl px-4 py-1">
              EP 42
            </span>
          </div>

          <!-- Hero title -->
          <div nbSection padding="lg" class="pt-3 pb-0">
            <h1 nbDisplay class="uppercase font-black leading-[0.95] mb-0!">
              Design<br />Systems<br />That Scale
            </h1>
            <div class="h-1.5 w-28 bg-pink-500 mt-4 mb-0!"></div>
          </div>

          <!-- Metadata chips -->
          <div nbSection padding="lg" class="pt-4 pb-0">
            <div
              nbCluster
              gap="sm"
              class="[--nb-chip-radius:6px] [--nb-chip-shadow:none]"
            >
              <span nbChip tone="mint" class="uppercase text-sm font-bold">
                <span
                  nbIcon
                  src="/podcast-card/clock.svg"
                  size="sm"
                  decorative
                ></span>
                45 MIN
              </span>

              <span nbChip tone="lavender" class="uppercase text-sm font-bold">
                <span
                  nbIcon
                  src="/podcast-card/sparkle.svg"
                  size="sm"
                  decorative
                ></span>
                NEW
              </span>

              <span nbChip tone="pink" class="uppercase text-sm font-bold">
                <span
                  nbIcon
                  src="/podcast-card/user.svg"
                  size="sm"
                  decorative
                ></span>
                UX
              </span>
            </div>
          </div>

          <!-- Description -->
          <div nbSection padding="lg" class="pt-4 pb-0">
            <p nbText size="md" weight="medium" tone="muted" measure="md">
              Practical strategies for building design systems that grow with
              your product.
            </p>
          </div>

          <!-- Host section with divider -->
          <div nbSection border="top" padding="lg" class="relative">
            <div nbCluster gap="lg" align="center">
              <img
                src="/podcast-card/avatar.png"
                alt="Kai Nguyen"
                class="w-16 h-16 rounded-lg border-2 border-black shrink-0"
              />

              <div nbStack gap="xs" align="start">
                <span nbText size="lg" weight="bold">Kai Nguyen</span>
                <span nbText size="sm" tone="muted">Host</span>
                <div class="flex items-center gap-1.5">
                  <span nbStatusDot state="online"></span>
                  <span nbText size="xs" weight="bold" class="uppercase tracking-wide"
                    >On Air</span
                  >
                </div>
              </div>
            </div>

            <!-- Halftone flourish -->
            <nb-halftone
              position="top-right"
              [rows]="6"
              [cols]="6"
              class="absolute top-4 right-5 opacity-80"
            ></nb-halftone>
          </div>

          <!-- Audio player -->
          <div nbSection padding="lg" class="pt-0">
            <img
              src="/podcast-card/timeline.png"
              alt="Episode player — playing at 22:15 of 45:00"
              class="w-full"
            />
          </div>

          <!-- Footer: Listen Now button + bookmark -->
          <div nbSection padding="lg" class="pt-0">
            <div nbCluster gap="md" align="center" justify="between">
              <button
                nbButton
                tone="lavender"
                size="xl"
                radius="md"
                weight="black"
                transform="uppercase"
                tracking="wide"
                class="flex-1"
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

          <!-- Blue sparkle flourish (no building-block equivalent for a 4-point twinkle) -->
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="absolute top-[26%] right-7"
          >
            <path
              d="M12 1 L14.5 9.5 L23 12 L14.5 14.5 L12 23 L9.5 14.5 L1 12 L9.5 9.5 Z"
              fill="#38bdf8"
              stroke="#000"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>

          <!-- Dashed arrow flourish -->
          <svg
            width="70"
            height="50"
            viewBox="0 0 70 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="absolute right-5 top-[52%]"
          >
            <path
              d="M 4 30 Q 30 50, 50 18"
              stroke="#ec4899"
              stroke-width="2.5"
              stroke-dasharray="5,5"
              fill="none"
              stroke-linecap="round"
            />
            <path
              d="M 44 8 L 54 14 L 47 24"
              fill="none"
              stroke="#ec4899"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <!-- Decorative stickers that overflow the card edges -->
        <nb-sticker
          shape="star"
          tone="lavender"
          aria-label="Happy episode sticker"
          class="absolute -top-6 -right-6 z-20"
          [rotate]="10"
        >
          <nb-sticker-face />
        </nb-sticker>

        <nb-sticker
          shape="splat"
          tone="pink"
          decorative
          class="absolute -bottom-7 -left-7 z-20"
          [rotate]="-12"
        ></nb-sticker>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastCard {}
