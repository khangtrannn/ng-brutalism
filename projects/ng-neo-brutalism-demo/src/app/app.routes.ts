import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'button',
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-demo/button-demo.component').then(
        (m) => m.ButtonDemoComponent
      ),
  },
];
