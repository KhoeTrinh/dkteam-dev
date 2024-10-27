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
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'products/:id',
    component: ProductsdetailsComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: 'edit/users',
    component: UserAdminComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/admin',
    component: AdminComponent,
  },
  {
    path: 'dashboard/users',
    component: UsersComponent,
  },
  {
    path: 'dashboard/products',
    component: ProductsComponent,
  },
  {
    path: 'dashboard/products/:id',
    component: ProductEditComponent,
  },
  {
    path: 'create',
    component: CreateComponent
  }
];
