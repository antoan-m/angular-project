import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ]
})

export class RegisterComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
  }

  registerHandlerCall(): void {

  this.userService.registerHandler(
    this.form.value.name, 
    this.form.value.email, 
    this.form.value.password, 
    this.form.value.address, 
    this.form.value.publisher
    )
  }  
  
}