import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocsCodeBlock } from '@ng-brutalism/docs-ui';

@Component({
  selector: 'docs-marquee-usage',
  imports: [DocsCodeBlock],
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeUsage {
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
}
