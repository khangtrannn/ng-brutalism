import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbButton,
  NbButtonTrailingIcon,
  NbCallout,
  NbChip,
  NbChipGroup,
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
    NbChipGroup,
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
    <div nbCluster justify="center" padding="xl" class="travel-stage w-full">
      <div
        nbSurface
        clip
        tone="cream"
        border="strong"
        shadow="hard"
        radius="xl"
        class="relative w-full"
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
          gap="2xl"
          padding="lg"
          collapse="md"
          separator="solid"
        >
          <div nbStack gap="lg">
            <div nbCluster gap="md" align="center">
              <img
                src="/tokyo-city-escape/roam-go-logo.png"
                alt="Roam & Go logo"
                class="w-16"
              />

              <span
                nbText
                size="xl"
                weight="extrabold"
                underline="bar"
                underlineGap="none"
                underlineWidth="sm"
                >Roam &amp; Go</span
              >
            </div>

            <h1 nbDisplay class="uppercase">Tokyo<br />City Escape</h1>

            <p nbText size="md" weight="medium" tone="muted" measure="md">
              Explore iconic neighborhoods, savor local flavors, and make
              unforgettable memories.
            </p>
          </div>

          <div nbStack gap="lg" align="start" class="shrink-0">
            <div
              nbChipGroup
              direction="vertical"
              gap="sm"
              align="start"
              radius="sm"
              shadow="none"
              transform="uppercase"
              tracking="wide"
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

            <div nbCallout tone="yellow" radius="sm" size="xl" shadow="hard">$799</div>
          </div>
        </div>

        <div nbSection divider="top" padding="lg">
          <div nbSplit ratio="2:1" gap="lg" collapse="md">
            <div nbCluster gap="2xl" align="center" separator="dashed">
              <nb-media-item
                size="xs"
                icon="/tokyo-city-escape/central-locations.png"
              >
                <span nbMediaItemTitle>Central<br />Locations</span>
              </nb-media-item>

              <nb-media-item
                size="xs"
                icon="/tokyo-city-escape/guided-experiences.png"
              >
                <span nbMediaItemTitle>Guided<br />Experiences</span>
              </nb-media-item>

              <nb-media-item size="xs" icon="/tokyo-city-escape/24-7-support.png">
                <span nbMediaItemTitle>24/7<br />Support</span>
              </nb-media-item>
            </div>

            <button nbButton tone="lavender" size="xl" radius="md">
              <span
                nbText
                size="xl"
                weight="black"
                transform="uppercase"
                tracking="wide"
              >
                Book Trip
              </span>
              <span nbButtonTrailingIcon shape="circle" tone="inverse" size="md">
                <span nbIcon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      --travel-paper-grid: #eadfca;
      display: block;
    }

    .travel-stage {
      background-color: #fff8e8;
      background-image:
        linear-gradient(to right, var(--travel-paper-grid) 1px, transparent 1px),
        linear-gradient(to bottom, var(--travel-paper-grid) 1px, transparent 1px);
      background-size: 28px 28px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelCard {}
