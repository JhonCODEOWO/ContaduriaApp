import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { HomeAdminPageComponent } from './pages/home-admin-page/home-admin-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { TaxesPageComponent } from './pages/taxes-page/taxes-page.component';
import { UserFormComponent } from './pages/users-page/user-form/user-form.component';
import { ClientDetailsComponent } from './pages/clients-page/client-details/client-details.component';
import { ClientsAssignedToUserComponent } from './pages/users-page/clients-assigned-to-user/clients-assigned-to-user.component';
import { RegimeDataComponent } from './pages/taxes-page/regime-data/regime-data.component';
import { ObligationDataComponent } from './pages/taxes-page/obligation-data/obligation-data.component';
import { SecurityPageComponent } from './pages/security-page/security-page.component';
import { ActivitiesAdminPageComponent } from './pages/activities-admin-page/activities-admin-page.component';
import { ActivityFormComponent } from './pages/activities-admin-page/activity-form/activity-form.component';
import { ClientContractsComponent } from './pages/clients-page/client-contract/client-contracts.component';
import { ContractFormComponent } from './pages/clients-page/client-contract/contract-form/contract-form.component';
import { ManageContractClientComponent } from './pages/clients-page/client-contract/manage-contract-client/manage-contract-client.component';

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
                path: 'clients/contracts/:id',
                component: ClientContractsComponent
            },
            {
                path: 'clients/contracts/create/:idClient/:idContract',
                component: ManageContractClientComponent
            },
            {
                path: 'taxes',
                component: TaxesPageComponent
            },
            {
                path: 'taxes/regime/:id',
                component: RegimeDataComponent
            },
            {
                path: 'taxes/obligation/:id',
                component: ObligationDataComponent
            },
            {
                path: 'security',
                component: SecurityPageComponent,
                title: 'Seguridad',
            },
            {
                path: 'activities',
                component: ActivitiesAdminPageComponent,
                title: 'Gestión de actividades'
            },
            {
                path: 'activities/:id',
                component: ActivityFormComponent,
                title: 'Actividad'
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
]

export default adminRoutes;