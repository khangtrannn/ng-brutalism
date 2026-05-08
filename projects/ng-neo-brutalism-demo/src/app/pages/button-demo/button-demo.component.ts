import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButton } from 'ng-neo-brutalism';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [NbButton],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {}
