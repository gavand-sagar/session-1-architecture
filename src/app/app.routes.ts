import { Routes } from '@angular/router';
import { Shell } from './core/layout/shell';

/**
 * Top-level routes: the Shell is the layout, features are its children.
 * Each feature is lazy loaded (more about this in Session 2).
 */
export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', title: 'Dashboard', loadComponent: () => import('./features/dashboard/dashboard.page') },
      { path: 'products', loadChildren: () => import('./features/products/products.routes') },
    ],
  },
  { path: '**', redirectTo: '' },
];
