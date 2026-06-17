# Marquee

A horizontally scrolling ticker that loops its content infinitely. Supports configurable speed, reverse direction, and pause on hover.

## Import
```typescript
import { NbMarquee, NbMarqueeItem } from '@ng-brutalism/ui';
```

## API Reference
| Attribute | Type | Default | Description |
|---|---|---|---|
| `duration` | `string` | `'5s'` | Animation duration (e.g. `'10s'`). Controls the speed. |
| `reverse` | `boolean` | `false` | Reverse the scroll direction when set to true. |
| `pauseOnHover` | `boolean` | `true` | Pause the marquee animation when the cursor hovers over it. |

## Usage Examples

### Default
```html
<nb-marquee class="w-full" duration="10s">
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
</nb-marquee>
```

```typescript
interface Skill {
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
];
```

### Reverse Direction
```html
<nb-marquee class="w-full" duration="10s" [reverse]="true">
  <!-- Items here -->
</nb-marquee>
```

### Custom Speed
```html
<nb-marquee class="w-full" duration="20s">
  <!-- Items here -->
</nb-marquee>
```

### Disable Pause on Hover
```html
<nb-marquee class="w-full" duration="10s" [pauseOnHover]="false">
  <!-- Items here -->
</nb-marquee>
```
