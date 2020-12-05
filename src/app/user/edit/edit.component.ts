import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';

const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

Backendless.initApp(APP_ID, API_KEY);

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private router: Router) {}

  currentUserData;

  ngOnInit() {

let getUserData = Backendless.UserService.getCurrentUser()
 .then(function(currentUser) {
   return currentUser;
  })
 .catch(function (error) {
   console.error(error)
  })

getUserData.then(result => {
    console.log(JSON.stringify(result));
    this.currentUserData = result;    
  })
}

//update user profile info
editUserHandler() {
  
  class AppUser extends Backendless.User {
    name: string;
    address: string;
    publisher: boolean;
   }

const user: AppUser = new AppUser();

user.objectId = this.currentUserData.objectId;
user.address = this.form.value.address;
user.name = this.form.value.name;

Backendless.UserService.update(user)
  .then(success => {
  console.log('User has been updated');
  localStorage.setItem('name', user.name);
  this.router.navigate(['user/profile']);
  })
  .catch(error => {
  console.error('Server reported an error: ', error.message)
  console.error('error code: ', error.code)
  console.error('http status: ', error.status)
  })
}

cancelUserProfileEdit() {
  this.router.navigate(['user/profile']);
}


}