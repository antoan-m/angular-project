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

filterGames: string;
gameData: any;
games: any;

  ngOnInit(): void {

    // const whereClause = `title LIKE '"${this.filterGames}%"'`;
    // const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);

    this.gameData = new Promise((resolve, reject) => {

    let getGamesData = Backendless.Data.of('games').find()
    .then(function(currentGames) {
      //console.log('Search: ' + currentGames)
      return currentGames;
     })
    .catch(function (error) {
      console.error(error)
     })
   
     getGamesData.then(result => {
       //console.log(JSON.stringify(result));
       this.games = result;
       return this.games;
     })
    })  

}

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

// getGameId(id) {
//   if(!id) {
//     console.log(id);
//     id = localStorage.getItem('currentGameId');
//   }
//   console.log(id);
//   localStorage.setItem('currentGameId', id);
//   return id;
// }

getGameId(id) {
    console.log(id);
    id = localStorage.setItem('currentGameId', id);
  return id;
}


}
