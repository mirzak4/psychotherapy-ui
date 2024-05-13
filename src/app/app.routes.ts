import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    // Auth routes
    {
        path: '',
        loadChildren: () => import('./modules/auth/auth.routes')
    },
    {
        path: 'articles',
        loadChildren: () => import('./modules/articles/articles.routes') 
    }
];
