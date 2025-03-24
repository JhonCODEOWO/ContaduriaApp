import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { HomeAdminPageComponent } from './pages/home-admin-page/home-admin-page.component';

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
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
]

export default adminRoutes;