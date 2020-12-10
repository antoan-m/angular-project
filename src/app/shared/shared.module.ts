import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgxLoadersCssModule } from 'ngx-loaders-css';

@NgModule({
  declarations: [
    LoaderComponent,
    NgxLoadersCssModule
  ],
  imports: [
    CommonModule,
    NgxLoadersCssModule
  ],
  providers: [

  ],
  exports: [
    LoaderComponent,
    NgxLoadersCssModule
  ]
})
export class SharedModule { }
