import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ContactService } from './contact.service';
import { BrowserModule } from '@angular/platform-browser';
import { ContactSuccessComponent } from './contact-success/contact-success.component';



@NgModule({
  declarations: [
    ContactComponent,
    ContactSuccessComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ContactService
    ]
})
export class ContactModule { }
