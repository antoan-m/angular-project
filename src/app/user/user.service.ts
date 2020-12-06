import { Injectable, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';

const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

Backendless.initApp(APP_ID, API_KEY);

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isLogged = false;
  userName = localStorage['isLogged']

@ViewChild('f', { static: false }) form: NgForm;

constructor(private router: Router) {}

loginHandler(email, password) {

 Backendless.UserService.login(email, password, true)
  .then(loggedInUser => {
    console.log(loggedInUser);
    console.log(loggedInUser['user-token']);
    localStorage.setItem('isLogged', 'true');
    localStorage.userToken = loggedInUser['user-token'];
    localStorage.name = loggedInUser['name'];
    localStorage.publisherMenu = loggedInUser['publisher'];
    localStorage.email = email;
    this.userName = localStorage.name;
    this.isLogged = localStorage.isLogged;
    this.publisherMenu = localStorage.publisherMenu;

   this.router.navigate(['/']);
   })
 .catch(error => {
   console.log(error);
  //  M.toast({html: error})
  })
  }

  
  logoutUser() {
    Backendless.UserService.logout()
     .then(() => {
      localStorage.removeItem('isLogged');
      localStorage.removeItem('userToken');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('publisherMenu');
      localStorage.removeItem('currentGameId');
      localStorage.removeItem('wishlist');
      this.isLogged = false;
      })
     .catch(err => console.log(err.message));

  // this.router.navigate(['/'])
  }

  currentUserData;
  publisherMenu;

userDataObject = () => {

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
    if (this.currentUserData.publisher) {
      this.publisherMenu = true;
    }  
  })
}


}