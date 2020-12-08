import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) =>  this.authService.checkLogged.then((user) => {
      if (!user) {
        M.toast({html: 'You are not logged in!'});
        this.router.navigate(['user/login']);
        return resolve(false);
      } else {
            Backendless.UserService.getCurrentUser()
            .then(user => {
                if (!user.publisher) {
                  this.router.navigate(['/']);
                  //return resolve(false);
                }
             })
            .catch(error => {
             });
        return resolve(true);
      }
    }));
}
  
}