import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { UserService } from '../user.service';

const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

Backendless.initApp(APP_ID, API_KEY);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private router: Router, private userService: UserService) {}

  currentUserData;
  publisherMenu = false;

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
    if (this.currentUserData.publisher) {
      this.publisherMenu = true;
    }  
  })
  

}

}