import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import Feature from 'ol/Feature';
import OlMap from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { Icon, Style } from 'ol/style';
import 'ol/ol.css';

import type { TimelineEntry } from '../portfolio.types';

const MARKER_SVG = `
  <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="ms" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
      </filter>
    </defs>
    <g filter="url(#ms)">
      <circle cx="18" cy="18" r="14" fill="#FFD700" stroke="#000000" stroke-width="2"/>
      <circle cx="18" cy="18" r="6" fill="#000000"/>
    </g>
  </svg>
`;

const MARKER_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  MARKER_SVG
)}`;

const INITIAL_CENTER: [number, number] = [58, 30];
const INITIAL_ZOOM = 2;

@Component({
    selector: 'docs-portfolio-journey',
    imports: [],
    template: `
    <section
      id="journey"
      class="portfolio-grid-section relative scroll-mt-6 bg-white p-2 py-8 sm:p-4 sm:py-12 md:p-6 md:py-16 lg:p-8"
    >
      <div class="portfolio-grid-bg absolute inset-0"></div>
      <div class="portfolio-radial absolute inset-0"></div>
      <div class="relative z-10 mx-auto max-w-full px-2 sm:px-5">
        <div class="portfolio-section-title mb-4 sm:mb-6 md:mb-10">
          <h2
            class="text-center font-heading text-xl font-black text-black sm:text-2xl md:text-4xl lg:text-5xl"
          >
            My Journey Through Time &amp; Space
            <span aria-hidden="true">🗺️</span>
          </h2>
        </div>

        <div
          class="relative h-[400px] overflow-hidden rounded-md border-2 border-black bg-[#dbeafe] shadow-[4px_4px_0px_0px_#000] sm:h-[500px] sm:border-4 sm:shadow-[8px_8px_0px_0px_#000] md:h-[600px] lg:h-[700px] xl:h-[750px]"
        >
          <div #mapEl class="portfolio-map-canvas absolute inset-0"></div>

          <aside
            class="absolute left-0 top-0 z-20 flex h-full w-full transform flex-col overflow-hidden border-r-2 border-black bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out sm:w-[380px] sm:border-r-4 md:w-[420px]"
            [class.-translate-x-full]="!timelineOpen()"
            [class.translate-x-0]="timelineOpen()"
          >
            <div
              class="flex flex-none items-center justify-between border-b-2 border-black bg-white p-3 sm:border-b-4 sm:p-4"
            >
              <h3 class="text-lg font-black text-black sm:text-xl">
                Journey Timeline
              </h3>
              <button
                class="rounded bg-black p-2 text-white transition-colors hover:bg-gray-800 md:hidden"
                type="button"
                aria-label="Close timeline"
                (click)="toggleTimeline()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </div>

            <div class="relative flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
              @for (entry of timeline(); track entry.id; let index = $index) {
              <button
                class="relative w-full cursor-pointer rounded-md border-l-4 border-transparent py-3 pl-10 pr-2 text-left transition-colors duration-200 hover:bg-gray-100 sm:py-4 sm:pl-14 sm:pr-4 md:pl-16"
                type="button"
                [class.bg-yellow-100]="activeJourney() === index"
                (click)="onTimelineClick(index)"
              >
                <span
                  class="absolute left-4 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-black sm:left-6"
                ></span>
                <span class="block text-base font-black sm:text-lg md:text-xl">
                  {{ entry.title }}
                </span>
                <span
                  class="block font-mono text-xs font-bold text-gray-600 sm:text-sm"
                >
                  {{ entry.date }}
                </span>
                <span
                  class="mt-1.5 block text-sm leading-relaxed sm:mt-2 sm:text-base"
                >
                  {{ entry.description }}
                </span>
                <span
                  class="mt-2 flex items-center gap-2 text-xs font-medium text-gray-700 sm:mt-3 sm:text-sm"
                >
                  <span aria-hidden="true">📍</span>{{ entry.locationName }}
                </span>
              </button>
              }
            </div>
          </aside>

          @if (isMobile() && !timelineOpen()) {
          <button
            class="absolute left-4 top-4 z-30 rounded-lg border-4 border-black bg-white p-3 text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            type="button"
            aria-label="Open timeline"
            (click)="toggleTimeline()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          }

          <div
            class="pointer-events-none absolute right-4 top-4 z-10 max-w-[200px] rounded-md border-2 border-black bg-white/80 p-2 px-3 text-xs font-medium text-black shadow-md backdrop-blur-sm sm:max-w-xs sm:text-sm md:right-20 lg:right-24"
          >
            Click markers or timeline items to explore!
          </div>

          <div
            class="absolute bottom-2 right-2 z-10 flex flex-col gap-1.5 sm:bottom-4 sm:right-4 sm:gap-2 lg:top-4"
          >
            <button
              class="portfolio-map-control"
              type="button"
              aria-label="Zoom in"
              (click)="zoom('in')"
            >
              +
            </button>
            <button
              class="portfolio-map-control"
              type="button"
              aria-label="Zoom out"
              (click)="zoom('out')"
            >
              −
            </button>
            <button
              class="portfolio-map-control text-base"
              type="button"
              aria-label="Reset map"
              (click)="resetView()"
            >
              ⌂
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioJourneyComponent {
  readonly activeJourney = input(0);
  readonly timeline = input.required<TimelineEntry[]>();
  readonly activeJourneyChanged = output<number>();

  private readonly mapEl = viewChild.required<ElementRef<HTMLDivElement>>('mapEl');
  private readonly destroyRef = inject(DestroyRef);

  protected readonly timelineOpen = signal(true);
  protected readonly isMobile = signal(false);

  private map: OlMap | null = null;
  private overlay: Overlay | null = null;
  private popupEl: HTMLDivElement | null = null;
  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupResponsive();
      this.initMap();
    });

    effect(() => {
      const idx = this.activeJourney();
      const entries = this.timeline();
      if (!this.map || !this.overlay || idx < 0 || idx >= entries.length) {
        this.overlay?.setPosition(undefined);
        return;
      }
      this.focusEntry(entries[idx], false);
    });

    this.destroyRef.onDestroy(() => {
      this.mediaQuery?.removeEventListener('change', this.onResize);
      this.map?.dispose();
      this.map = null;
      this.overlay = null;
      this.popupEl = null;
    });
  }

  protected toggleTimeline(): void {
    this.timelineOpen.update((v) => !v);
  }

  protected onTimelineClick(index: number): void {
    this.activeJourneyChanged.emit(index);
    const entry = this.timeline()[index];
    if (entry) {
      this.focusEntry(entry, true);
    }
    if (this.isMobile()) {
      this.timelineOpen.set(false);
    }
  }

  protected zoom(direction: 'in' | 'out'): void {
    if (!this.map) return;
    const view = this.map.getView();
    const current = view.getZoom() ?? INITIAL_ZOOM;
    const target = direction === 'in' ? current + 1 : current - 1;
    const min = view.getMinZoom() ?? 2;
    const max = view.getMaxZoom() ?? 18;
    view.animate({
      zoom: Math.max(min, Math.min(target, max)),
      duration: 250,
    });
  }

  protected resetView(): void {
    if (!this.map || !this.overlay) return;
    this.map.getView().animate({
      center: fromLonLat(INITIAL_CENTER),
      zoom: INITIAL_ZOOM,
      duration: 800,
    });
    this.overlay.setPosition(undefined);
    this.activeJourneyChanged.emit(-1);
  }

  private setupResponsive(): void {
    this.mediaQuery = window.matchMedia('(max-width: 767px)');
    this.onResize();
    this.mediaQuery.addEventListener('change', this.onResize);
  }

  private readonly onResize = (): void => {
    const mobile = this.mediaQuery?.matches ?? false;
    this.isMobile.set(mobile);
    this.timelineOpen.set(!mobile);
  };

  private initMap(): void {
    this.popupEl = document.createElement('div');
    this.popupEl.className = 'portfolio-map-popup';

    this.overlay = new Overlay({
      element: this.popupEl,
      positioning: 'bottom-center',
      offset: [0, -40],
      stopEvent: false,
    });

    this.map = new OlMap({
      target: this.mapEl().nativeElement,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
          }),
        }),
        this.buildVectorLayer(),
      ],
      controls: [],
      view: new View({
        center: fromLonLat(INITIAL_CENTER),
        zoom: INITIAL_ZOOM,
        maxZoom: 18,
        minZoom: 2,
      }),
    });
    this.map.addOverlay(this.overlay);

    this.map.on('pointermove', (event) => {
      if (event.dragging || !this.map) return;
      const feature = this.map.forEachFeatureAtPixel(
        event.pixel,
        (f) => f as Feature
      );
      const target = this.map.getTargetElement();
      if (target) {
        target.style.cursor = feature ? 'pointer' : '';
      }
      if (feature) {
        const entry = feature.get('entry') as TimelineEntry;
        this.showPopup(entry);
      } else {
        const activeIdx = this.activeJourney();
        const entries = this.timeline();
        if (activeIdx >= 0 && activeIdx < entries.length) {
          this.showPopup(entries[activeIdx]);
        } else {
          this.overlay?.setPosition(undefined);
        }
      }
    });

    this.map.on('singleclick', (event) => {
      if (!this.map) return;
      const feature = this.map.forEachFeatureAtPixel(
        event.pixel,
        (f) => f as Feature
      );
      if (!feature) return;
      const entry = feature.get('entry') as TimelineEntry;
      const index = this.timeline().findIndex((e) => e.id === entry.id);
      if (index >= 0) {
        this.activeJourneyChanged.emit(index);
        this.focusEntry(entry, true);
        if (this.isMobile()) {
          this.timelineOpen.set(false);
        }
      }
    });

    const initialIdx = this.activeJourney();
    const entries = this.timeline();
    if (initialIdx >= 0 && initialIdx < entries.length) {
      this.focusEntry(entries[initialIdx], false);
    }
  }

  private buildVectorLayer(): VectorLayer<VectorSource> {
    const style = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: MARKER_URL,
        scale: 1,
      }),
    });
    const features = this.timeline().map((entry) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(entry.location)),
      });
      feature.set('entry', entry);
      feature.setStyle(style);
      return feature;
    });
    return new VectorLayer({
      source: new VectorSource({ features, wrapX: false }),
      zIndex: 10,
    });
  }

  private focusEntry(entry: TimelineEntry, animate: boolean): void {
    if (!this.map || !this.overlay) return;
    const coords = fromLonLat(entry.location);
    if (animate) {
      const view = this.map.getView();
      const current = view.getZoom() ?? INITIAL_ZOOM;
      view.animate({
        center: coords,
        zoom: Math.max(current, 8),
        duration: 800,
      });
    }
    this.showPopup(entry, coords);
  }

  private showPopup(entry: TimelineEntry, coords?: number[]): void {
    if (!this.overlay || !this.popupEl) return;
    this.popupEl.innerHTML = `
      <h3>${this.escape(entry.popupTitle)}</h3>
      <p>${this.escape(entry.popupDescription)}</p>
    `;
    this.overlay.setPosition(coords ?? fromLonLat(entry.location));
  }

  private escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
