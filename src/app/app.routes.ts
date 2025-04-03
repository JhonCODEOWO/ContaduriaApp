import { Routes } from '@angular/router';
import { EmployeesLayoutComponent } from './employees/layouts/employees-layout/employees-layout.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { VerifyAuthGuard } from './auth/guards/verify-auth.guard';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';

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
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canMatch: [
            isAuthenticatedGuard
        ]
    },
    {
        path:'login',
        component: LoginPageComponent,
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
