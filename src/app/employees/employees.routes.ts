import { Routes } from '@angular/router';
import { EmployeesLayoutComponent } from './layouts/employees-layout/employees-layout.component';
import { NotFoundComponent } from '../common/components/not-found/not-found.component';
import { ActivitiesPageComponent } from './pages/activities-page/activities-page.component';
import { WorkClientsPageComponent } from './pages/work-clients-page/work-clients-page.component';
import { ViewClientPageComponent } from '../clients/pages/view-client-page/view-client-page.component';

export const employeeRoutes: Routes = [
    {
        path: '',
        component: EmployeesLayoutComponent,
        children: [
            {
                path: '',
                component: ActivitiesPageComponent
            },
            {
                path: 'clients',
                component: WorkClientsPageComponent
            },
            {
                path: 'clients/:id',
                component: ViewClientPageComponent
            }
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full'
    }
]

export default employeeRoutes;