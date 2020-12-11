import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(private router: Router) { }

games: any;
currentUserData: any;
userId: any;
orders: string;
printOrders: any;
gameInfo: any;
boughtGames: any;

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

  this.currentUserData = result; 
   this.userId = this.currentUserData.objectId;
   this.orders = this.currentUserData.orders;

   this.printOrders = this.orders.split(',');

   this.orders = this.printOrders;

var whereClause = `orders LIKE '%${this.userId}%'`;
var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
let getGamesData = Backendless.Data.of('games').find(queryBuilder)
 .then(function(boughtGames) {
    return boughtGames;
    })
   .catch(function (error) {
     console.error(error)
    })
    getGamesData.then(result => {
      this.games = result;    
    })


    })

}

getGameId(id) {
  if(!id) {
    id = localStorage.getItem('currentGameId');
  }
  localStorage.setItem('currentGameId', id);
  return id;
}

//get game data
getGameDetails(gameId) {

// var whereClause = `orders LIKE '%${gameId}%'`;
// var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
// Backendless.Data.of('games').find(queryBuilder)
//  .then(function(currentsGame) {
//     console.log(currentsGame);
//      return currentsGame;
//     })
//    .catch(function (error) {
//      console.error(error)
//     })
 
  //     let getGamesData = Backendless.Data.of('games').find(gameId)
  //  .then(function(currentsGame) {
  //   console.log(currentsGame);
  //    return currentsGame;
  //   })
  //  .catch(function (error) {
  //    console.error(error)
  //   })

    // getGamesData.then(result => {
    //       console.log('GAMES: ' + JSON.stringify(result));
    //       this.games = result; 
    //       console.log(this.games.title);   
    //     })

}



}
