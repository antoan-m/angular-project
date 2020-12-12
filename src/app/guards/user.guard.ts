import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Toast } from "materialize-css";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
 
currentUser: any;

constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    return new Promise((resolve, reject) =>  this.authService.checkLogged.then((user) => {
      if (!user) {
        M.toast({html: 'You are not logged in!'});
        this.router.navigate(['user/login']);
        return resolve(false);
      } else {
            Backendless.UserService.getCurrentUser()
            .then(user => {
              this.currentUser = user;
                if (this.currentUser.publisher) {
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