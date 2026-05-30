import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbDisplay,
  NbMediaFrame,
  NbMediaItem,
  NbMediaItemTitle,
  NbSeparator,
  NbStack,
  NbSticker,
  NbSurface,
} from '@ng-brutalism/ui';

@Component({
  selector: 'recipe-travel-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbCallout,
    NbChip,
    NbDisplay,
    NbMediaFrame,
    NbMediaItem,
    NbMediaItemTitle,
    NbSeparator,
    NbStack,
    NbSticker,
    NbSurface,
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
        style="--nb-surface-bg: #faf6f0"
      >
        <div class="relative">
          <nb-sticker
            shape="burst"
            tone="mint"
            aria-label="4 days, 3 nights"
            class="absolute top-2 left-2 z-20"
            [rotate]="-12"
          >
            4D<br />/ 3N
          </nb-sticker>

          <div
            nbMediaFrame
            ratio="21/9"
            radius="none"
            shadow="none"
            border="none"
          >
            <img
              src="/tokyo-city-escape/hero-illustration.png"
              alt="Illustrated Tokyo"
            />
          </div>
        </div>

        <div class="grid gap-6 p-4 md:grid-cols-[2fr_auto_1fr]">
          <div nbStack gap="lg">
            <div class="flex items-center gap-3">
              <img
                src="/tokyo-city-escape/roam-go-logo.png"
                alt="Roam & Go logo"
                class="w-16"
              />

              <span class="text-xl font-extrabold">Roam &amp; Go</span>
            </div>

            <h1 nbDisplay class="uppercase mb-0!">Tokyo<br />City Escape</h1>

            <p class="max-w-md text-base font-medium text-(--nb-foreground)/80">
              Explore iconic neighborhoods, savor local flavors, and make
              unforgettable memories.
            </p>
          </div>

          <hr nbSeparator orientation="vertical" class="hidden md:block" />

          <div nbStack gap="lg" align="start" class="shrink-0">
            <div
              nbStack
              gap="sm"
              align="start"
              class="[--nb-chip-radius:4px] [--nb-chip-shadow:none] uppercase tracking-wide"
            >
              <span nbChip tone="mint">
                <img
                  src="/tokyo-city-escape/nb-plane-fill.svg"
                  alt=""
                  aria-hidden="true"
                  class="size-4"
                />
                Flight included
              </span>

              <span nbChip tone="lavender">
                <img
                  src="/tokyo-city-escape/nb-hotel-fill.svg"
                  alt=""
                  aria-hidden="true"
                  class="size-4"
                />
                Hotel
              </span>

              <span nbChip tone="pink">
                <img
                  src="/tokyo-city-escape/nb-star-fill.svg"
                  alt=""
                  aria-hidden="true"
                  class="size-4"
                />
                Top pick
              </span>
            </div>

            <div nbCallout tone="yellow" size="xl" shadow="hard">$799</div>
          </div>
        </div>

        <div
          class="grid gap-5 border-t-2 border-(--nb-border) px-6 py-6 md:grid-cols-[2fr_1fr]"
        >
          <div
            class="flex flex-wrap items-center gap-4 **:data-nb-media-item:[--nb-media-item-title-size:12px]"
          >
            <nb-media-item icon="/tokyo-city-escape/central-locations.png">
              <span nbMediaItemTitle>Central<br />Locations</span>
            </nb-media-item>
            <hr nbSeparator orientation="vertical" variant="dashed" />
            <nb-media-item icon="/tokyo-city-escape/guided-experiences.png">
              <span nbMediaItemTitle>Guided<br />Experiences</span>
            </nb-media-item>
            <hr nbSeparator orientation="vertical" variant="dashed" />
            <nb-media-item icon="/tokyo-city-escape/24-7-support.png">
              <span nbMediaItemTitle>24/7<br />Support</span>
            </nb-media-item>
          </div>

          <button
            nbButton
            style="--nb-button-bg: var(--nb-lavender); --nb-button-radius: 0.5rem"
            class="h-14 px-4 text-[20px] font-black tracking-wide uppercase"
          >
            Book Trip
            <span
              nbButtonTrailingIcon
              class="inline-flex size-8 items-center justify-center rounded-full bg-(--nb-foreground) text-(--nb-background)"
            >
              <span
                aria-hidden="true"
                class="size-4 bg-current [mask:url(/tokyo-city-escape/nb-arrow-right.svg)_center/contain_no-repeat]"
              ></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelCard {}
