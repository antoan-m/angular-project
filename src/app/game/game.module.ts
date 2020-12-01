import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { GamesComponent } from './games/games.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddComponent } from './add/add.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { OrdersComponent } from './orders/orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';



@NgModule({
  declarations: [
    GamesComponent, 
    DetailComponent, AddComponent, MyGamesComponent, OrdersComponent, MyOrdersComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class GameModule { }
