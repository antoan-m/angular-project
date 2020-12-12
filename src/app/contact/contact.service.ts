import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Toast } from "materialize-css";

@Injectable({
  providedIn: 'root'
})

export class ContactService {

constructor(private router: Router, private userService: UserService) { }

serverError: any;
currentUser: any;

//contact
contactHandler(contactForm: any) {

  this.currentUser = this.userService.getUserInfo();


  var contactMessage = {
    email: this.currentUser || contactForm.email,
    name: contactForm.name,
    subject: contactForm.subject,
    message: contactForm.message
  }
     
//send message
Backendless.Data.of('messages').save(contactMessage)
  .then(savedObject => {
    //console.log(savedObject);
  M.toast({html: 'Message sent successfully!'}),
  this.router.navigate(['/contact-success'])
  })
  .catch(error =>
    console.error('Cannot send message:', error.message,
    M.toast({html: error.message}),
    this.serverError = error
    ));

}

}