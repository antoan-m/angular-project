import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private router: Router) { }

  games: any;
  currentUserData: any;
  userId: any;
  wishlist: string;
  printWishlist: any;
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
     console.log('USER: ' + JSON.stringify(result));
     this.currentUserData = result; 
     this.userId = this.currentUserData.objectId;
     this.wishlist = this.currentUserData.wishlist;
  
     this.printWishlist = this.wishlist.split(',');
  
     console.log('Userid: ' + this.userId + " |||||||| wishlist: " +  this.printWishlist);
  
     this.wishlist = this.printWishlist;
  
    //wishlist LIKE '%B63744A3-C3C3-4FC5-8CF4-3FCD131A0929%'
  
  var whereClause = `wishlist LIKE '%${this.userId}%'`;
  var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
  let getGamesData = Backendless.Data.of('games').find(queryBuilder)
   .then(function(boughtGames) {
      return boughtGames;
      })
     .catch(function (error) {
       console.error(error)
      })
      getGamesData.then(result => {
        console.log(JSON.stringify(result));
        this.games = result;    
      })
  
  
      })
  
  }
  
  //get game data
  getGameDetails(gameId) {
  
  // var whereClause = `wishlist LIKE '%${gameId}%'`;
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