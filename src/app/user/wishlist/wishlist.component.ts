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

    //get user data
      let getUserData = Backendless.UserService.getCurrentUser()
     .then(function(currentUser) { return currentUser; })
     .catch(function (error) { console.error(error) })
      getUserData.then(result => {
        console.log('User: '+ JSON.stringify(result));
        this.currentUserData = result;
      })

      //get game data
      let getGameData = Backendless.Data.of('games').findById(gameId)
     .then(currentGame => { return currentGame; })
     .catch(error => { console.log(error); });
    
      getGameData.then(result => {
        //console.log(JSON.stringify(result));
        this.currentGameData = result;    
      })
    
      //remove from user db
      let wishlist = this.currentUserData.wishlist;
      console.log('WISHLIST1: ' + wishlist);
      console.log(gameId);
    
  
      if(!this.currentUserData.wishlist) {
        console.log('No games in your wishlist!');
      } else {
      let currentWishlist = this.currentUserData.wishlist;
      console.log('WISHLIST2: ' + currentWishlist.split(','));
      let newWishlist = currentWishlist.split(',');
      let index = newWishlist.indexOf(gameId);
      newWishlist.splice(index, 1);
      let updateWishlist = newWishlist.toString();
      console.log('updateWishlist: ' + updateWishlist);
      if (!updateWishlist) {updateWishlist === ''}
      
      console.log('to update: ' + this.currentUserData.objectId + '||||' + updateWishlist);
      
      Backendless.UserService.update({objectId: this.currentUserData.objectId, wishlist: updateWishlist})
        .then(success => {
        console.log(JSON.stringify(success) + 'Removed from your wishlist!');
        localStorage.setItem('wishlist', updateWishlist);
        })
        .catch(error => {
        console.error('Server reported an error: ', error.message)
        console.error('error code: ', error.code)
        console.error('http status: ', error.status)
        })
      }
    
      //remove from game db
          let newGameWishlist: any;

          console.log('Check game data: ' + this.currentGameData);
        
          if(!this.currentGameData.wishlist) {
            console.log('No games in your wishlist!');
          } else if(this.currentGameData.wishlist.indexOf(this.currentUserData.objectId) === -1) {
              let currentGameWishlist = this.currentGameData.wishlist;
              newGameWishlist = currentGameWishlist.split(',');
              let index = newGameWishlist.indexOf(gameId);
              newGameWishlist.splice(index, 1);
              let updateWishlist = newGameWishlist.toString();
    
              updateWishlist = newGameWishlist.toString();

              console.log('@@@@@@@@@@@@@ ' + updateWishlist);
              
              Backendless.Data.of('games').save({objectId: gameId, wishlist: updateWishlist })
                .then(savedGame => { console.log('FINAL2: ' + savedGame); })
                .catch(error => { console.error(error.message); });
            }
        }
  
  
  }