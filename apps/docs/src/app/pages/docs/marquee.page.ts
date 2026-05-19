import { ChangeDetectionStrategy, Component } from '@angular/core';

import MarqueePageComponent from '../components/marquee.page';

@Component({
    selector: 'docs-marquee-route-page',
    imports: [MarqueePageComponent],
    template: `<docs-marquee-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MarqueeRoutePageComponent {}
