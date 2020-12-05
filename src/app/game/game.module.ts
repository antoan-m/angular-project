import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { GamesComponent } from './games/games.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddComponent } from './add/add.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { FormsModule } from '@angular/forms';
import { GameService } from './game.service';
import { EditGameComponent } from './edit-game/edit-game.component';



@NgModule({
  declarations: [
    GamesComponent, 
    DetailComponent, 
    AddComponent, 
    MyGamesComponent, 
    EditGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    GameService
    ]
})
export class GameModule { }
