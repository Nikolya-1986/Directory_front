import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'contacts'
    },
    {
        path: 'contacts',
        loadComponent: () => import('./pages/home/home.component').then((component) => component.HomeComponent)
    }
];
