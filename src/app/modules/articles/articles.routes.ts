import { Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';

export default [
    {
        path: '',
        pathMatch: 'full',
        component: ArticlesComponent
    }
] as Routes;