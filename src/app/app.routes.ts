import { Routes } from '@angular/router';
import { EmployeesLayoutComponent } from './employees/layouts/employees-layout/employees-layout.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { VerifyAuthGuard } from './auth/guards/verify-auth.guard';

export const routes: Routes = [
    {
        path: 'employees',
        loadChildren: () => import('./employees/employees.routes'),
        canMatch: [
            VerifyAuthGuard
        ]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes'),
        canMatch: [
            VerifyAuthGuard
        ]
    },
    {
        path:'login',
        component: LoginPageComponent
    },
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
