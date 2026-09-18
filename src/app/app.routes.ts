import { Routes } from '@angular/router';

// Single-page portfolio: Home renders every section (About, Skills, Projects,
// Experience, Contact) inline, and the navbar scrolls to each section's
// anchor instead of navigating to a separate route.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Neou Sopanha — Full-Stack Web Developer',
  },
  { path: '**', redirectTo: '' },
];
