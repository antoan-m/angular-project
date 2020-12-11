import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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

}


}