import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private router: Router, private userService: UserService) {}

  currentUserData;
  publisherMenu: boolean;

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