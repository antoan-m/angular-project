import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private router: Router) { }

games: any;
currentUserData: any;
userId: any;
sales: number;

ngOnInit() {

  //get user info
let getUserData = Backendless.UserService.getCurrentUser()
.then(function(currentUser) {
  return currentUser;
 })
.catch(function (error) {
  console.error(error)
 })

getUserData.then(result => {
   console.log('USER: ' + JSON.stringify(result));
   this.currentUserData = result; 
   this.userId = this.currentUserData.objectId;

   console.log('Userid: ' + this.userId);

   //get game data
   const whereClause = "ownerId='" + this.userId + "'";
   const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause).setSortBy(['orders DESC']);
 
   let getGamesData = Backendless.Data.of('games').find(queryBuilder)
   .then(function(currentGames) {
     return currentGames;
    })
   .catch(function (error) {
     console.error(error)
    })

    getGamesData.then(result => {
      console.log('GAMES: ' + JSON.stringify(result));
      this.games = result; 
      console.log(this.games.orders);   
    })
   })

}

gameSales(value) {
  return Array.from(value.split(',')).length;
}


getGameId(id) {
    if(!id) {
      id = localStorage.getItem('currentGameId');
    }
    console.log(id);
    localStorage.setItem('currentGameId', id);
    return id;
  }


}
