import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { HomeAdminPageComponent } from './pages/home-admin-page/home-admin-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { TaxesPageComponent } from './pages/taxes-page/taxes-page.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: HomeAdminPageComponent
            },
            {
                path: 'users',
                component: UsersPageComponent
            },
            {
                path: 'clients',
                component: ClientsPageComponent
            },
            {
                path: 'taxes',
                component: TaxesPageComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
]

export default adminRoutes;