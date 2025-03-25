import { Routes } from '@angular/router';
import { EmployeesLayoutComponent } from './layouts/employees-layout/employees-layout.component';
import { NotFoundComponent } from '../common/components/not-found/not-found.component';
import { ActivitiesPageComponent } from './pages/activities-page/activities-page.component';

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
                component: ActivitiesPageComponent
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