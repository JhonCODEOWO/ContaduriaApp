import { Routes } from '@angular/router';
import { EmployeesLayoutComponent } from './employees/layouts/employees-layout/employees-layout.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

export const routes: Routes = [
    {
        path: 'employees',
        loadChildren: () => import('./employees/employees.routes'),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes')
    },
    {
        path:'login',
        component: LoginPageComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
