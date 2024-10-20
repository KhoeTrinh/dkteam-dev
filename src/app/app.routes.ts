import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ProductsdetailsComponent } from './pages/productsdetails/productsdetails.component';

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
  }
];
