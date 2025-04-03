import { Routes } from '@angular/router';
import { UserPageComponent } from '../users/pages/user-page/user-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'view/:id',
                component: UserPageComponent,
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
]

export default authRoutes;