import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main-page/main-page.component').then((m) => m.MainPageComponent),
  },
  {
    path: ':country',
    loadComponent: () => import('./pages/country/country.component').then((m) => m.CountryComponent),
  }

];
