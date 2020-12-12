import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadersCssModule } from 'ngx-loaders-css';

@NgModule({
  declarations: [
    NgxLoadersCssModule
  ],
  imports: [
    CommonModule,
    NgxLoadersCssModule
  ],
  providers: [

  ],
  exports: [
    NgxLoadersCssModule
  ]
})
export class SharedModule { }
