import { ChangeDetectionStrategy, Component } from '@angular/core';

import MarqueePage from '../components/marquee.page';

@Component({
    selector: 'docs-marquee-route-page',
    imports: [MarqueePage],
    template: `<docs-marquee-page />`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MarqueeRoutePage {}
