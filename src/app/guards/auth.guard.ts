import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) =>  this.authService.checkLogged.then((user) => {
      if (!user) {
        M.toast({html: 'You are not logged in!'});
        this.router.navigate(['user/login']);
        return resolve(false);
      } else {
        return resolve(true);
      }
    }));
}
}