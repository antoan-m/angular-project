import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AboutModule } from './about/about.module';
import { GameModule } from './game/game.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { UserModule } from './user/user.module';
import { FormsModule } from '@angular/forms';
import Backendless from 'backendless';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { PublisherGuard } from './guards/publisher.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxLoadersCssModule } from 'ngx-loaders-css';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    HomeModule,
    AboutModule,
    GameModule,
    UserModule,
    ShowcaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxLoadersCssModule
  ],
  providers: [
    AuthGuard,
    UserGuard,
    PublisherGuard
    ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }