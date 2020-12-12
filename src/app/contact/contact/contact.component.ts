import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { UserService } from 'src/app/user/user.service';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})


export class ContactComponent implements OnInit {

  @ViewChild('c', { static: false }) form: NgForm;

  constructor(private router: Router, public contactService: ContactService) { }

  ngOnInit(): void {
  }

  contactForm: any;

  contactHandlerCall(): void {
      this.contactForm = this.form.value;
      this.contactService.contactHandler(this.contactForm);
  }

  

}
