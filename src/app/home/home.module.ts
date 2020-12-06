import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserService } from '../user/user.service';
import { HomeService } from './home.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    HomeService
  ]
})
export class HomeModule { }
