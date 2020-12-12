import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { UserService } from '../user.service';

// const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
// const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

// Backendless.initApp(APP_ID, API_KEY);

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private router: Router, public userService: UserService) {}


  currentUserData;

  ngOnInit() {

//get current user info
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
editUserHandlerCall(): void {

  this.userService.editUserHandler(this.currentUserData.objectId, this.form.value.name, this.form.value.address)
  
}

cancelUserProfileEdit() {
  this.router.navigate(['user/profile']);
}


}