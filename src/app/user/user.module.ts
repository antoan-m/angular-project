import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, OrdersComponent, WishlistComponent, MyOrdersComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
