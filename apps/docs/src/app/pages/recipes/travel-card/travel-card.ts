import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NbAvatarGroup,
  NbButton,
  NbChip,
  NbChipGroup,
  NbDisplay,
  NbHalftone,
  NbIconButton,
  NbProgress,
  NbSticker,
} from '@ng-brutalism/ui';

@Component({
  selector: 'recipe-travel-card',
  imports: [
    NbAvatarGroup,
    NbButton,
    NbChip,
    NbChipGroup,
    NbDisplay,
    NbHalftone,
    NbIconButton,
    NbProgress,
    NbSticker,
  ],
  template: `
    Travel Card
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelCard {}
