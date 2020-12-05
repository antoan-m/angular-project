import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';

const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

Backendless.initApp(APP_ID, API_KEY);

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  registerHandler() {

    console.log(`Data before sending: ${JSON.stringify(this.form.value)}`);

  class AppUser extends Backendless.User {
    name: string;
    address: string;
    publisher: boolean;
   }
    
 const user: AppUser = new AppUser();

 user.name = this.form.value.name;
 user.email = this.form.value.email;
 user.password = this.form.value.password;
 user.address = this.form.value.address;
 user.publisher = this.form.value.publisher
 
 if (!this.form.value.publisher) {
  user.publisher = false;
 }
 
 Backendless.UserService.register<AppUser>(user)
  .then((result: AppUser) => 
  console.log('Registered User:', result,
  // M.toast({html: 'Registration successful!'}),
  this.router.navigate(['user/login'])
  ))
  .catch(error => 
    console.error('Can not Register User:', error.message
    // , M.toast({html: error.message})
    ));
  }
  
}