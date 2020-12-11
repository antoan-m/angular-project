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
  currentGameData: any;
  userId: any;
  wishlist: string;
  inWishlist: boolean;
  printWishlist: any;
  gameInfo: any;
  boughtGames: any;
  game: any;
  
  ngOnInit() {
  
    //get user info
  let getUserData = Backendless.UserService.getCurrentUser()
  .then(function(currentUser) {
    return currentUser;
   })
  .catch(function (error) {
    console.error(error);
   })
  
  getUserData.then(result => {
     this.currentUserData = result; 
     this.userId = this.currentUserData.objectId;
     this.wishlist = this.currentUserData.wishlist;
  
     this.printWishlist = this.wishlist.split(',');
  
     this.wishlist = this.printWishlist;
    
  var whereClause = `wishlist LIKE '%${this.userId}%'`;
  var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
  let getGamesData = Backendless.Data.of('games').find(queryBuilder)
   .then(function(currentGames) {
      return currentGames;
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
    console.log(id);
    localStorage.setItem('currentGameId', id);
    return id;
  }


  removeRow(event) {
    const td = event.target.parentNode; 
    const tr = td.parentNode.parentNode; // the row to be removed
    tr.parentNode.removeChild(tr);
  }
  

  //remove game from wishlist
  removeFromWishlist(gameId: string) {

    // //get user data
    //   let getUserData = Backendless.UserService.getCurrentUser()
    //  .then(function(currentUser) { return currentUser; })
    //  .catch(function (error) { console.error(error) })
    //   getUserData.then(result => {
    //    //console.log('User: '+ JSON.stringify(result));
    //     this.currentUserData = result;
    //   })

      //get game data
    //   let getGameData = Backendless.Data.of('games').findById(gameId)
    //  .then(currentGame => { 
    //   console.log(currentGame);
    //    return currentGame; })
    //  .catch(error => { console.log(error); });
    
    //   getGameData.then(result => {
    //     //console.log('CURRENT GAME DATA: ' + JSON.stringify(result));
    //     this.currentGameData = result;    
    //   })
    
      //remove from user db
      let wishlist = this.currentUserData.wishlist;
      //console.log('USER WISHLIST: ' + wishlist);
      //console.log(gameId);
    
  
      if(!wishlist) {
        //console.log('No games in your wishlist!');
      } else {
      let currentWishlist = this.currentUserData.wishlist.split(',');
      let index = currentWishlist.indexOf(gameId);
      currentWishlist.splice(index, 1);
      let updateWishlist = currentWishlist.toString();
      if (!updateWishlist) {updateWishlist = ''}
      
      Backendless.UserService.update({objectId: this.currentUserData.objectId, wishlist: updateWishlist})
        .then(success => {
        //console.log(JSON.stringify(success) + 'Removed from your wishlist!');
        //111localStorage.setItem('wishlist', updateWishlist);
        })
        .catch(error => {
        console.error('Server reported an error: ', error.message)
        console.error('error code: ', error.code)
        console.error('http status: ', error.status)
        })
      }
    
      //remove from game db
          let updateWishlist: any;
          let currentGame = this.games.find(curGame => curGame.objectId === gameId);
          let test = currentGame;
          let currentGameWishlist = currentGame.wishlist;
          if (!currentGameWishlist) {
            currentGameWishlist = '';
          } else {
            currentGameWishlist = currentGameWishlist.split(',');
          }

          if(!currentGameWishlist) {
            //console.log('No games in your wishlist!');
          } else if(currentGameWishlist.indexOf(this.currentUserData.objectId) !== -1) {
              let index = currentGameWishlist.indexOf(this.currentUserData.objectId);
              currentGameWishlist.splice(index, 1);
              updateWishlist = currentGameWishlist.toString();

              Backendless.Data.of('games').save({objectId: gameId, wishlist: updateWishlist })
                .then(savedGame => { console.log('Game removed from Wishlist!');
                M.toast({html: 'Game removed from Wishlist!'}); })
                .catch(error => { console.error(error.message); });
            }
        }
  

  }