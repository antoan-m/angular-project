import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private userService: UserService) {}

  get isLogged(): boolean {
    return localStorage.isLogged;
  }

  get userName(): void {
    return localStorage.name;
  }

  publisherMenu = this.userService.publisherMenu;

  logoutUser(): void {
    this.userService.logoutUser();
  }

  ngOnInit(): void {
    
  }

}
