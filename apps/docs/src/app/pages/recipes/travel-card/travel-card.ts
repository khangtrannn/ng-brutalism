import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbChip,
  NbDisplay,
  NbMediaFrame,
  NbMediaItem,
  NbSeparator,
  NbSticker,
  NbSurface,
} from '@ng-brutalism/ui';

@Component({
  selector: 'recipe-travel-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbChip,
    NbDisplay,
    NbMediaFrame,
    NbMediaItem,
    NbSeparator,
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
            class="absolute top-2 left-2 z-20"
            rotate=-12
          >
            4D<br />/ 3N
          </nb-sticker>

          <div nbMediaFrame ratio="21/9" radius="none" shadow="none">
            <img
              src="/tokyo-city-escape/hero-illustration.png"
              alt="Illustrated Tokyo"
            />
          </div>
        </div>

        <div class="grid grid-cols-[2fr_auto_1fr] p-4 gap-6">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <img
                src="/tokyo-city-escape/roam-go-logo.png"
                alt="Roam & Go logo"
                class="w-16"
              />

              <span class="text-xl font-extrabold">Roam &amp; Go</span>
            </div>

            <h1 nbDisplay class="uppercase mb-0!">Tokyo<br>City Escape</h1>

            <p class="max-w-md text-base font-medium text-(--nb-foreground)/80">
              Explore iconic neighborhoods, savor local flavors, and make
              unforgettable memories.
            </p>
          </div>

          <hr nbSeparator orientation="vertical" />

          <div class="flex shrink-0 flex-col items-start gap-4">
            <div class="flex flex-col items-start gap-2.5 [--nb-chip-radius:4px] [--nb-chip-shadow:none] uppercase tracking-wide">
              <span nbChip tone="mint">
                <img src="/tokyo-city-escape/nb-plane-fill.svg" class="size-4" />
                Flight included
              </span>

              <span nbChip tone="lavender">
                <img src="/tokyo-city-escape/nb-hotel-fill.svg" class="size-4" />
                Hotel
              </span>

              <span nbChip tone="pink">
                <img src="/tokyo-city-escape/nb-star-fill.svg" class="size-4" />
                Top pick
              </span>
            </div>

            <div
              nbSurface
              tone="yellow"
              border="strong"
              shadow="hard"
              radius="sm"
              layout="center"
              class="px-5 py-2"
            >
              <h2 nbDisplay>$799</h2>
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-[2fr_1fr] gap-5 border-t-2 border-(--nb-border) px-6 py-6"
        >
          <div
            class="flex flex-wrap items-center gap-4 **:data-nb-media-item:[--nb-media-item-title-size:12px]"
          >
            <nb-media-item icon="/tokyo-city-escape/central-locations.png">
              <span data-nb-media-item-title>Central<br>Locations</span>
            </nb-media-item>
            <hr nbSeparator orientation="vertical" variant="dashed" />
            <nb-media-item icon="/tokyo-city-escape/guided-experiences.png">
              <span data-nb-media-item-title>Guided<br>Experiences</span>
            </nb-media-item>
            <hr nbSeparator orientation="vertical" variant="dashed" />
            <nb-media-item icon="/tokyo-city-escape/24-7-support.png">
              <span data-nb-media-item-title>24/7<br>Support</span>
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
