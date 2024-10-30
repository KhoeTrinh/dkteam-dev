import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ProductsdetailsComponent } from './pages/product/productsdetails/productsdetails.component';
import { EditComponent } from './pages/edit/user/edit.component';
import { ProductEditComponent } from './pages/edit/product/product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/dashboard/admin/admin.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { ProductsComponent } from './pages/dashboard/products/products.component';
import { UserAdminComponent } from './pages/edit/user-admin/user-admin.component';
import { CreateComponent } from './pages/create/create.component';
import { NotLogged } from './guards/not-logged.guard';
import { Logged } from './guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [NotLogged],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotLogged],
  },
  {
    path: 'products/:id',
    component: ProductsdetailsComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [Logged],
  },
  {
    path: 'edit/users',
    component: UserAdminComponent,
    canActivate: [Logged],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [Logged],
  },
  {
    path: 'dashboard/admin',
    component: AdminComponent,
    canActivate: [Logged],
  },
  {
    path: 'dashboard/users',
    component: UsersComponent,
    canActivate: [Logged],
  },
  {
    path: 'dashboard/products',
    component: ProductsComponent,
    canActivate: [Logged],
  },
  {
    path: 'dashboard/products/:id',
    component: ProductEditComponent,
    canActivate: [Logged],
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [Logged],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
