import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { AppRoutingModule } from '../app-routing.module';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    EditComponent, 
    ProfileComponent, 
    WishlistComponent, 
    MyOrdersComponent, 
    MyOrdersComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
    ],
    providers: [
      UserService
    ]
})
export class UserModule { } 