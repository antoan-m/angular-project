import { Injectable } from '@angular/core';
import Backendless from 'backendless';

const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

Backendless.initApp(APP_ID, API_KEY);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
checkLogged: any;

  constructor() {
    this.checkLogged = 
      Backendless.UserService.isValidLogin()
     .then(result => {
       return result;
      })
     .catch(error => { 
      console.log('ERROR: ' + error.message);
      console.log('ERROR CODE: ' + error.statusCode);
    });
   
      
  }

  

}