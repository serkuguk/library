import { Routes } from '@angular/router';
import {
  isAuthCanMatch,
  loggedGuard,
  redirectLoggedInGuard
} from '@core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('@pages/auth/components/login/login.component').then(c => c.LoginComponent),
    canActivate: [redirectLoggedInGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@pages/home/home.component').then(c => c.HomeComponent),
    canMatch: [isAuthCanMatch],
    canActivate: [loggedGuard]
  },
  {
    path: '**',
    canActivate: [loggedGuard],
    loadComponent: () => import('@pages/notfound-page/notfound-page.component').then(c => c.NotfoundPageComponent)
  }
];
