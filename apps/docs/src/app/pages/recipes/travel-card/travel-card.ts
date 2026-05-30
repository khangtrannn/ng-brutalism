import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbCluster,
  NbDisplay,
  NbIcon,
  NbMediaFrame,
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
  selector: 'recipe-travel-card',
  imports: [
    NbButton,
    NbButtonTrailingIcon,
    NbCallout,
    NbChip,
    NbCluster,
    NbDisplay,
    NbIcon,
    NbMediaFrame,
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
              <img
                src="/tokyo-city-escape/roam-go-logo.png"
                alt="Roam & Go logo"
                class="w-16"
              />

              <span nbText size="xl" weight="extrabold">Roam &amp; Go</span>
            </div>

            <h1 nbDisplay class="uppercase mb-0!">Tokyo<br />City Escape</h1>

            <p nbText size="md" weight="medium" tone="muted" measure="md">
              Explore iconic neighborhoods, savor local flavors, and make
              unforgettable memories.
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
                <span nbIcon src="/tokyo-city-escape/nb-plane-fill.svg" size="sm" decorative></span>
                Flight included
              </span>

              <span nbChip tone="lavender">
                <span nbIcon src="/tokyo-city-escape/nb-hotel-fill.svg" size="sm" decorative></span>
                Hotel
              </span>

              <span nbChip tone="pink">
                <span nbIcon src="/tokyo-city-escape/nb-star-fill.svg" size="sm" decorative></span>
                Top pick
              </span>
            </div>

            <div nbCallout tone="yellow" size="xl" shadow="hard">$799</div>
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
              <nb-media-item icon="/tokyo-city-escape/central-locations.png">
                <span nbMediaItemTitle>Central<br />Locations</span>
              </nb-media-item>

              <nb-media-item icon="/tokyo-city-escape/guided-experiences.png">
                <span nbMediaItemTitle>Guided<br />Experiences</span>
              </nb-media-item>

              <nb-media-item icon="/tokyo-city-escape/24-7-support.png">
                <span nbMediaItemTitle>24/7<br />Support</span>
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
              Book Trip
              <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
                <span nbIcon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelCard {}
