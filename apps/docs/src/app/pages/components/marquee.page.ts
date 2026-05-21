import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';

import { DocsCodeBlock } from '../../docs/docs-code-block';
import { DocsExample } from '../../docs/docs-example';
import { DocsSourceTile } from '../../docs/docs-source-tile';
import { DocsTokens } from '../../docs/docs-tokens';

interface MarqueeSkill {
  text: string;
  iconSlug: string;
  iconLabel: string;
}

@Component({
    selector: 'docs-marquee-page',
    imports: [
        DocsCodeBlock,
        DocsExample,
        DocsSourceTile,
        DocsTokens,
        NbMarquee,
        NbMarqueeItem,
    ],
    template: `
    <article>
      <header id="overview" class="relative mb-10 scroll-mt-32">
        <div class="mb-5">
          <p>Ng Brutalism Marquee</p>
          <h1>Marquee</h1>
          <p class="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The Ng Brutalism Marquee component. A horizontally scrolling
            ticker that loops its content infinitely. Supports configurable
            speed, reverse direction, and pause on hover.
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <div class="nb-stat-tile nb-stat-tile--yellow">
            <span class="nb-stat-tile__value">∞</span>
            <span class="nb-stat-tile__label">Loop</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--mint">
            <span class="nb-stat-tile__value">2</span>
            <span class="nb-stat-tile__label">Directions</span>
          </div>
          <div class="nb-stat-tile nb-stat-tile--pink">
            <span class="nb-stat-tile__value">CSS</span>
            <span class="nb-stat-tile__label">Pure</span>
          </div>

          <docs-source-tile
            href="https://github.com/khangtrannn/ng-brutalism/tree/main/libs/ui/src/lib/marquee"
          />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Preview</h2>
        <docs-example [code]="defaultExampleTemplateCode">
          <nb-marquee class="w-full" duration="10s">
            @for (skill of skills; track skill.text) {
              <nb-marquee-item>
                <span class="mx-4 flex items-center sm:mx-6 lg:mx-8">
                  <img
                    class="mr-2 h-7 w-7 object-contain sm:mr-3 sm:h-9 sm:w-9"
                    [src]="
                      'https://cdn.simpleicons.org/' + skill.iconSlug + '/000000'
                    "
                    [alt]="skill.iconLabel + ' logo'"
                    loading="lazy"
                  />
                  <span class="font-heading text-lg sm:text-xl lg:text-2xl">
                    {{ skill.text }}
                  </span>
                </span>
              </nb-marquee-item>
            }
          </nb-marquee>
        </docs-example>
      </section>

      <section id="usage">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Usage</h2>
        <docs-code-block
          class="block mb-5"
          title="Import"
          [code]="importCode"
        />
        <docs-code-block
          class="block mb-5"
          title="Component"
          [code]="defaultExampleComponentCode"
        />
        <docs-code-block title="Template" [code]="defaultExampleTemplateCode" />
      </section>

      <section id="reverse">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Reverse</h2>
        <docs-example [code]="reverseExampleCode">
          <nb-marquee class="w-full" duration="10s" [reverse]="true">
            @for (skill of skills; track skill.text) {
              <nb-marquee-item>
                <span class="mx-4 flex items-center sm:mx-6 lg:mx-8">
                  <img
                    class="mr-2 h-7 w-7 object-contain sm:mr-3 sm:h-9 sm:w-9"
                    [src]="
                      'https://cdn.simpleicons.org/' + skill.iconSlug + '/000000'
                    "
                    [alt]="skill.iconLabel + ' logo'"
                    loading="lazy"
                  />
                  <span class="font-heading text-lg sm:text-xl lg:text-2xl">
                    {{ skill.text }}
                  </span>
                </span>
              </nb-marquee-item>
            }
          </nb-marquee>
        </docs-example>
      </section>

      <section id="custom-speed">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Custom speed</h2>
        <docs-example [code]="customSpeedExampleCode">
          <nb-marquee class="w-full" duration="20s">
            @for (skill of skills; track skill.text) {
              <nb-marquee-item>
                <span class="mx-4 flex items-center sm:mx-6 lg:mx-8">
                  <img
                    class="mr-2 h-7 w-7 object-contain sm:mr-3 sm:h-9 sm:w-9"
                    [src]="
                      'https://cdn.simpleicons.org/' + skill.iconSlug + '/000000'
                    "
                    [alt]="skill.iconLabel + ' logo'"
                    loading="lazy"
                  />
                  <span class="font-heading text-lg sm:text-xl lg:text-2xl">
                    {{ skill.text }}
                  </span>
                </span>
              </nb-marquee-item>
            }
          </nb-marquee>
        </docs-example>
      </section>

      <section id="pause-on-hover">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">Disable pause</h2>
        <docs-example [code]="pauseOnHoverExampleCode">
          <nb-marquee
            class="w-full"
            duration="10s"
            [pauseOnHover]="false"
          >
            @for (skill of skills; track skill.text) {
              <nb-marquee-item>
                <span class="mx-4 flex items-center sm:mx-6 lg:mx-8">
                  <img
                    class="mr-2 h-7 w-7 object-contain sm:mr-3 sm:h-9 sm:w-9"
                    [src]="
                      'https://cdn.simpleicons.org/' + skill.iconSlug + '/000000'
                    "
                    [alt]="skill.iconLabel + ' logo'"
                    loading="lazy"
                  />
                  <span class="font-heading text-lg sm:text-xl lg:text-2xl">
                    {{ skill.text }}
                  </span>
                </span>
              </nb-marquee-item>
            }
          </nb-marquee>
        </docs-example>
      </section>

      <docs-tokens component="marquee" />

      <section id="api">
        <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">API</h2>

        <div
          class="overflow-x-auto border-2 border-(--nb-border) bg-nb-surface shadow-[5px_5px_0_0_var(--nb-shadow)]"
        >
          <table class="w-full min-w-160 border-collapse text-left">
            <thead class="bg-nb-secondary text-nb-secondary-fg">
              <tr>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Input
                </th>
                <th
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-bold"
                >
                  Type
                </th>
                <th class="border-b-2 border-(--nb-border) px-4 py-3 font-bold">
                  Default
                </th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  duration
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  string
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  '5s'
                </td>
              </tr>
              <tr>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3"
                >
                  reverse
                </td>
                <td
                  class="border-b-2 border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td
                  class="border-b-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  false
                </td>
              </tr>
              <tr>
                <td class="border-r-2 border-(--nb-border) px-4 py-3">
                  pauseOnHover
                </td>
                <td
                  class="border-r-2 border-(--nb-border) px-4 py-3 font-mono text-sm"
                >
                  boolean
                </td>
                <td class="px-4 py-3 font-mono text-sm">true</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MarqueePage {
  protected readonly importCode = `import { NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';`;

  protected readonly defaultExampleComponentCode = `interface Skill {
  text: string;
  iconSlug: string;
  iconLabel: string;
}

protected readonly skills: Skill[] = [
  { text: 'ArcGIS', iconSlug: 'arcgis', iconLabel: 'ArcGIS' },
  { text: 'QGIS', iconSlug: 'qgis', iconLabel: 'QGIS' },
  { text: 'Docker', iconSlug: 'docker', iconLabel: 'Docker' },
  { text: 'OpenLayers', iconSlug: 'openlayers', iconLabel: 'OpenLayers' },
  { text: 'Leaflet', iconSlug: 'leaflet', iconLabel: 'Leaflet' },
  { text: 'Kubernetes', iconSlug: 'kubernetes', iconLabel: 'Kubernetes' },
  { text: 'Argo CD', iconSlug: 'argo', iconLabel: 'Argo CD' },
  {
    text: 'Apache Airflow',
    iconSlug: 'apacheairflow',
    iconLabel: 'Apache Airflow',
  },
  { text: 'GeoServer', iconSlug: 'osgeo', iconLabel: 'OSGeo' },
  { text: 'Python', iconSlug: 'python', iconLabel: 'Python' },
  { text: 'JavaScript', iconSlug: 'javascript', iconLabel: 'JavaScript' },
  { text: 'TypeScript', iconSlug: 'typescript', iconLabel: 'TypeScript' },
  { text: 'Angular', iconSlug: 'angular', iconLabel: 'Angular' },
  { text: 'PostGIS', iconSlug: 'postgresql', iconLabel: 'PostgreSQL' },
  { text: 'Version Control', iconSlug: 'git', iconLabel: 'Git' },
];`;

  protected readonly defaultExampleTemplateCode = `<nb-marquee class="w-full" duration="10s">
  @for (skill of skills; track skill.text) {
    <nb-marquee-item>
      <span class="mx-4 flex items-center sm:mx-6 lg:mx-8">
        <img
          class="mr-2 h-7 w-7 object-contain sm:mr-3 sm:h-9 sm:w-9"
          [src]="'https://cdn.simpleicons.org/' + skill.iconSlug + '/000000'"
          [alt]="skill.iconLabel + ' logo'"
          loading="lazy"
        />
        <span class="font-heading text-lg sm:text-xl lg:text-2xl">
          {{ skill.text }}
        </span>
      </span>
    </nb-marquee-item>
  }
</nb-marquee>`;

  protected readonly skills: MarqueeSkill[] = [
    { text: 'ArcGIS', iconSlug: 'arcgis', iconLabel: 'ArcGIS' },
    { text: 'QGIS', iconSlug: 'qgis', iconLabel: 'QGIS' },
    { text: 'Docker', iconSlug: 'docker', iconLabel: 'Docker' },
    { text: 'OpenLayers', iconSlug: 'openlayers', iconLabel: 'OpenLayers' },
    { text: 'Leaflet', iconSlug: 'leaflet', iconLabel: 'Leaflet' },
    { text: 'Kubernetes', iconSlug: 'kubernetes', iconLabel: 'Kubernetes' },
    { text: 'Argo CD', iconSlug: 'argo', iconLabel: 'Argo CD' },
    {
      text: 'Apache Airflow',
      iconSlug: 'apacheairflow',
      iconLabel: 'Apache Airflow',
    },
    { text: 'GeoServer', iconSlug: 'osgeo', iconLabel: 'OSGeo' },
    { text: 'Python', iconSlug: 'python', iconLabel: 'Python' },
    { text: 'JavaScript', iconSlug: 'javascript', iconLabel: 'JavaScript' },
    { text: 'TypeScript', iconSlug: 'typescript', iconLabel: 'TypeScript' },
    { text: 'Angular', iconSlug: 'angular', iconLabel: 'Angular' },
    { text: 'PostGIS', iconSlug: 'postgresql', iconLabel: 'PostgreSQL' },
    { text: 'Version Control', iconSlug: 'git', iconLabel: 'Git' },
  ];


  protected readonly reverseExampleCode = this.defaultExampleTemplateCode.replace(
    'duration="10s"',
    'duration="10s" [reverse]="true"'
  );

  protected readonly customSpeedExampleCode = this.defaultExampleTemplateCode.replace(
    'duration="10s"',
    'duration="20s"'
  );

  protected readonly pauseOnHoverExampleCode = this.defaultExampleTemplateCode.replace(
    'duration="10s"',
    'duration="10s" [pauseOnHover]="false"'
  );
}
