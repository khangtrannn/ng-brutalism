import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';

@Component({
  selector: 'docs-inspired-designs-page',
  template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Getting Started</p>
          <h1>Inspired Designs</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Neo-brutalist UI ideas to reference and make your own, built with @ng-brutalism/ui primitives.
          </p>
        </div>
      </header>

      <div class="columns-2 gap-4 lg:columns-3">
        @for (image of images; track image.src; let i = $index) {
          <picture class="mb-4 block">
            <source
              [srcset]="'/design/thumb/' + image.thumb"
              type="image/webp"
            />
            <img
              [src]="'/design/' + image.src"
              [alt]="image.alt"
              [width]="image.tw"
              [height]="image.th"
              class="w-full cursor-pointer border-3 border-black"
              [loading]="i < 4 ? 'eager' : 'lazy'"
              [attr.fetchpriority]="i === 0 ? 'high' : null"
              decoding="async"
              (click)="selected.set(image.src)"
            />
          </picture>
        }
      </div>

      @if (selected()) {
        <div
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          (click)="selected.set(null)"
        >
          <img
            [src]="'/design/' + selected()"
            [alt]="selected()!"
            class="max-h-[90vh] max-w-[90vw] border-4 border-white"
            (click)="$event.stopPropagation()"
          />
        </div>
      }
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InspiredDesignsPage {
  protected readonly selected = signal<string | null>(null);

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.selected.set(null);
  }

  // tw/th = thumb dimensions (360px wide, height proportional)
  protected readonly images = [
    { src: 'charity-card-feed-100-families.png', thumb: 'charity-card-feed-100-families.webp', alt: 'Charity card – Feed 100 families', tw: 360, th: 450 },
    { src: 'course-card-angular-signals.png', thumb: 'course-card-angular-signals.webp', alt: 'Course card – Angular signals', tw: 360, th: 450 },
    { src: 'dashboard-growth-snapshot.png', thumb: 'dashboard-growth-snapshot.webp', alt: 'Dashboard – Growth snapshot', tw: 360, th: 450 },
    { src: 'esports-card-indie-cup.png', thumb: 'esports-card-indie-cup.webp', alt: 'Esports card – Indie cup', tw: 360, th: 288 },
    { src: 'event-ticket-angular-summit-2026.png', thumb: 'event-ticket-angular-summit-2026.webp', alt: 'Event ticket – Angular Summit 2026', tw: 360, th: 450 },
    { src: 'event-ticket-loudwave-fest.png', thumb: 'event-ticket-loudwave-fest.webp', alt: 'Event ticket – Loudwave Fest', tw: 360, th: 288 },
    { src: 'finance-card-save-smart.png', thumb: 'finance-card-save-smart.webp', alt: 'Finance card – Save smart', tw: 360, th: 450 },
    { src: 'healthcare-card-book-checkup.png', thumb: 'healthcare-card-book-checkup.webp', alt: 'Healthcare card – Book checkup', tw: 360, th: 450 },
    { src: 'job-card-senior-angular-engineer.png', thumb: 'job-card-senior-angular-engineer.webp', alt: 'Job card – Senior Angular engineer', tw: 360, th: 450 },
    { src: 'listing-card-sunlit-loft.png', thumb: 'listing-card-sunlit-loft.webp', alt: 'Listing card – Sunlit loft', tw: 360, th: 450 },
    { src: 'podcast-card-design-systems-scale.png', thumb: 'podcast-card-design-systems-scale.webp', alt: 'Podcast card – Design systems at scale', tw: 360, th: 450 },
    { src: 'pricing-card-pro-plan.png', thumb: 'pricing-card-pro-plan.webp', alt: 'Pricing card – Pro plan', tw: 360, th: 450 },
    { src: 'product-card-pixelboard-mini.png', thumb: 'product-card-pixelboard-mini.webp', alt: 'Product card – Pixelboard Mini', tw: 360, th: 450 },
    { src: 'profile-card-nora-chen.png', thumb: 'profile-card-nora-chen.webp', alt: 'Profile card – Nora Chen', tw: 360, th: 450 },
    { src: 'restaurant-card-brunch-special.png', thumb: 'restaurant-card-brunch-special.webp', alt: 'Restaurant card – Brunch special', tw: 360, th: 450 },
    { src: 'scholarship-card-stem-grant.png', thumb: 'scholarship-card-stem-grant.webp', alt: 'Scholarship card – STEM grant', tw: 360, th: 450 },
    { src: 'testimonial-card-loved-by-teams.png', thumb: 'testimonial-card-loved-by-teams.webp', alt: 'Testimonial card – Loved by teams', tw: 360, th: 450 },
    { src: 'travel-card-tokyo-city-escape.png', thumb: 'travel-card-tokyo-city-escape.webp', alt: 'Travel card – Tokyo city escape', tw: 360, th: 288 },
  ];
}
