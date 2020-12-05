import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about/about.component';
import { AddComponent } from './game/add/add.component';
import { DetailComponent } from './game/detail/detail.component';
import { EditGameComponent } from './game/edit-game/edit-game.component';
import { GamesComponent } from './game/games/games.component';
import { MyGamesComponent } from './game/my-games/my-games.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './user/edit/edit.component';
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
    redirectTo: '/'
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
    path: 'games/details/:id',
    component: DetailComponent
  },
  {
    path: 'games/details/edit/:id',
    component: EditGameComponent
  },
  {
    path: 'games/add',
    component: AddComponent
  },
  {
    path: 'games/my-games',
    component: MyGamesComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/register',
    component: RegisterComponent
  },
  {
    path: 'user/profile',
    component: ProfileComponent
  },
  {
    path: 'user/edit',
    component: EditComponent
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
  },
  {
  path: '**', 
  redirectTo: '/'   // Wildcard route for a 404 page
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);