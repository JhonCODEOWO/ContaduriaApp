import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { HomeAdminPageComponent } from './pages/home-admin-page/home-admin-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { TaxesPageComponent } from './pages/taxes-page/taxes-page.component';
import { UserFormComponent } from './pages/users-page/user-form/user-form.component';
import { ClientFormComponent } from './pages/clients-page/client-form/client-form.component';
import { ClientDetailsComponent } from './pages/clients-page/client-details/client-details.component';
import { ClientsAssignedToUserComponent } from './pages/users-page/clients-assigned-to-user/clients-assigned-to-user.component';

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
                component: UsersPageComponent,
                title: 'Usuarios'
            },
            {
                path: 'users/:id',
                component: UserFormComponent,
                title: 'Manipular usuario'
            },
            {
                path: 'users/assignedClientsTo/:id',
                component: ClientsAssignedToUserComponent,
                title: 'Administrar clientes asignados'
            },
            {
                path: 'clients',
                component: ClientsPageComponent,
                title: 'Clientes'
            },
            {
                path: 'clients/:id',
                component: ClientDetailsComponent
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