import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { UserService } from '../user.service';


const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

Backendless.initApp(APP_ID, API_KEY);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
  }


loginHandlerCall(): void {
  
  this.userService.loginHandler(this.form.value.email, this.form.value.password)

  Backendless.UserService.getCurrentUser()
 .then(function(currentUser) {
  //console.log('USER: ' + currentUser)
  })
 .catch(error => {
  console.log('ERROR: ' + error);
  });
}


}