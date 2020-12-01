import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about/about.component';
import { AddComponent } from './game/add/add.component';
import { DetailComponent } from './game/detail/detail.component';
import { GamesComponent } from './game/games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { MyOrdersComponent } from './user/my-orders/my-orders.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { WishlistComponent } from './user/wishlist/wishlist.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
    },
  {
    path: 'home',
    redirectTo: '/home'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'games/details',
    component: DetailComponent
  },
  {
    path: 'games/add',
    component: AddComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/register',
    component: RegisterComponent
  },
  // {
  //   path: 'user/logout',
  //   component: LogoutComponent
  // },
  {
    path: 'user/profile',
    component: ProfileComponent
  },
  {
    path: 'user/wishlist',
    component: WishlistComponent
  },
  {
    path: 'user/orders',
    component: OrdersComponent
  },
  {
    path: 'user/my-orders',
    component: MyOrdersComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);