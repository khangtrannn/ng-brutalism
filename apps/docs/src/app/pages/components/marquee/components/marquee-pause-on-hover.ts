import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';

import { DocsExample } from '@ng-brutalism/docs-ui';

interface MarqueeSkill {
  text: string;
  iconSlug: string;
  iconLabel: string;
}

@Component({
  selector: 'docs-marquee-pause-on-hover',
  imports: [NbMarquee, NbMarqueeItem, DocsExample],
  template: `
    <section id="pause-on-hover">
      <h2 data-docs-heading class="mt-10 mb-4 text-2xl font-bold">
        Disable pause
      </h2>
      <docs-example [code]="pauseOnHoverExampleCode">
        <nb-marquee class="w-full" duration="10s" [pauseOnHover]="false">
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueePauseOnHover {
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

  protected readonly pauseOnHoverExampleCode =
    this.defaultExampleTemplateCode.replace(
      'duration="10s"',
      'duration="10s" [pauseOnHover]="false"',
    );
}
