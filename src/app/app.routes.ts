import { Routes } from '@angular/router';
import { CaseListComponent, CaseComponent } from './components';

export const routes: Routes = [
  {
    path: 'cases',
    component: CaseListComponent,
  },
  {
    path: 'cases/:id',
    component: CaseComponent,
  },
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'cases',
  },
];
