import { Routes } from '@angular/router';
import { ViewClientPageComponent } from './pages/view-client-page/view-client-page.component';

export const clientRoutes: Routes = [
    {
        path: ':id',
        component: ViewClientPageComponent,
    }
]

export default clientRoutes;