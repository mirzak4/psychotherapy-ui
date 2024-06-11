import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './modules/articles/components/article-detail/article-detail.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    resolve: {
      systemRoles: () => inject(AuthService).fetchAllRoles()
    },
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      // Auth routes
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/auth/auth.routes'),
      },
      {
        path: 'articles',
        loadChildren: () => import('./modules/articles/articles.routes'),
      },
      {
        path: 'patient',
        loadChildren: () => import('./modules/patient/patient.routes')
      }
    ]
  }
];
