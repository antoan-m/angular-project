import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { GamesComponent } from './games/games.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddComponent } from './add/add.component';
import { MyGamesComponent } from './my-games/my-games.component';



@NgModule({
  declarations: [
    GamesComponent, 
    DetailComponent, 
    AddComponent, 
    MyGamesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class GameModule { }
