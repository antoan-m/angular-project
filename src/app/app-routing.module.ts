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
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { PublisherGuard } from './guards/publisher.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact/contact.component';
import { ContactSuccessComponent } from './contact/contact-success/contact-success.component';

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
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'contact-success',
    component: ContactSuccessComponent
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
    component: EditGameComponent,
    canActivate: [AuthGuard, PublisherGuard]
  },
  {
    path: 'games/add',
    component: AddComponent,
    canActivate: [AuthGuard, PublisherGuard]
  },
  {
    path: 'games/my-games',
    component: MyGamesComponent,
    canActivate: [AuthGuard, PublisherGuard]
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
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/edit',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'user/orders',
    component: OrdersComponent,
    canActivate: [AuthGuard, PublisherGuard]
  },
  {
    path: 'user/my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  { 
    path: '**', redirectTo: '404' 
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });