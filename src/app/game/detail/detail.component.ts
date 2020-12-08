import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GameService } from '../game.service';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  
  currentGameData;
  game: Object;
  currentUserData;
  publisherMenu: Boolean = false;
  gameBought: Boolean = false;
  owner: Boolean;
  gameOrders;
  inWishlist;
  safeSource: SafeResourceUrl;

  constructor(private router: Router, private sanitizer: DomSanitizer, private gameService: GameService, private userService: UserService) {

  //get current game data from server 

  let objectId = localStorage.getItem('currentGameId');
  console.log('ID: ' + objectId);

 let getGameData = Backendless.Data.of('games').findById({objectId})
.then(currentGame => {
  console.log('Current Data: ' + JSON.stringify(currentGame));
  return currentGame;
 })
.catch(error => {
 console.log(error);
 });

 getGameData.then(result => {
   console.log(JSON.stringify(result));
   this.currentGameData = result;  
   this.safeSource =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.currentGameData.youtube_id}`);  
 })
 

//  get user data
 let getUserData = Backendless.UserService.getCurrentUser()
 .then(function(currentUser) {
   return currentUser;
  })
 .catch(function (error) {
   console.error(error)
  })

   //check if user is publisher and Game in Wishlist
   getUserData.then(result => {
    console.log('User: '+ JSON.stringify(result));
    this.currentUserData = result;  
    if (this.currentUserData.publisher) {
      this.publisherMenu = true;
    }
    if(this.currentUserData.wishlist.indexOf(this.currentGameData.objectId) !== -1) {
      this.inWishlist = true;
    }
  })


  
}

  

  ngOnInit(): void {

  //check if game is already bought
  if(this.currentUserData.orders.find(this.currentGameData.objectId)) {
    this.gameBought = true;
    console.log(this.gameBought);
    console.log(this.currentUserData.orders)
}

//check if user is publisher of the game
if(this.currentUserData.objectId === this.currentGameData.ownerId) {
  this.owner = true;
  console.log('OWNER: ' + this.owner);
} else {
  this.owner = false;
  console.log(this.owner)
}
  
  }

//buy game
  ordersArray;

  buyGame(gameId) {
    console.log('USER DATA: ' + JSON.stringify(this.currentUserData));
    console.log('GAME ID: ' + gameId);
    console.log('ORDERS: ' + this.currentUserData.orders);
  
      class AppUser extends Backendless.User {
        orders: String;
       }
    
    const user: AppUser = new AppUser();
    
    user.objectId = this.currentUserData.objectId;
    console.log('USER ID: ' + user.objectId);
    console.log('ORDERS: ' + this.currentUserData.orders);
    console.log('CHECK ORDERS FOR ID: ' + this.currentUserData.orders.indexOf(gameId));

      if (!this.currentUserData.orders) {
        this.currentUserData.orders = gameId;
        console.log('After adding the game to orders: ' + user.orders);
      } else {
        if(this.currentUserData.orders.indexOf(gameId) !== -1) {
          this.gameBought = true;
          console.log('Already bought!');
          return;
      } else {
        console.log(this.currentUserData.orders);
        //this.ordersArray = Array.from(JSON.parse(this.currentUserData.orders));
        this.ordersArray = Array.from([this.currentUserData.orders]);
        console.log(this.ordersArray);
        
        this.ordersArray.push(gameId);
        //(this.ordersArray).concat(gameId);
        console.log(this.ordersArray);
      }
      }

      user.orders = this.ordersArray.toString();

    console.log('user.orders: ' +  user.orders);
    
    Backendless.UserService.update(user)
      .then(success => {
      console.log('Game bought!');
      this.gameBought = true;
      })
      .catch(error => {
      console.error('Server reported an error: ', error.message)
      console.error('error code: ', error.code)
      console.error('http status: ', error.status)
      })

      this.gameOrders = Array.from([this.currentGameData.orders]);
      this.gameOrders.push(this.currentUserData.objectId);
      console.log('GAME ORDERS: ' + this.gameOrders);
      
    
      Backendless.Data.of('games').save({ objectId: gameId, orders: this.currentUserData.objectId })
        .then(savedOrder => {
        console.log(savedOrder);
        })
        .catch(error => {
        console.error(error);
        });
    

  }

  //add game to wihslist
  addGameToWishlist(gameId: string) {

  let getUserData = Backendless.UserService.getCurrentUser()
 .then(function(currentUser) {
   return currentUser;
  })
 .catch(function (error) {
   console.error(error)
  })

  getUserData.then(result => {
    console.log('User: '+ JSON.stringify(result));
    this.currentUserData = result;
  })

  let wishlist = this.currentUserData.wishlist;

console.log('WISHLIST1: ' + wishlist);
console.log('IDD' + gameId);

if(!this.currentUserData.wishlist) {
  Backendless.UserService.update({objectId: this.currentUserData.objectId, wishlist: gameId})
      .then(success => {
      console.log(JSON.stringify(success) + 'Added to your wishlist!');
      this.inWishlist = true;
      localStorage.setItem('wishlist', gameId);
      })
      .catch(error => {
      console.error('Server reported an error: ', error.message)
      console.error('error code: ', error.code)
      console.error('http status: ', error.status)
      })
    } else if (this.currentUserData.wishlist.indexOf(gameId) === -1) {
    let currentWishlist = this.currentUserData.wishlist;
        console.log('WISHLIST2: ' + currentWishlist.split(','));
    let newWishlist = currentWishlist.split(',');
    newWishlist.push(gameId);

    let updateWishlist = newWishlist.toString();

    Backendless.UserService.update({objectId: this.currentUserData.objectId, wishlist: updateWishlist})
      .then(success => {
      console.log(JSON.stringify(success) + 'Added to your wishlist!');
      this.inWishlist = true;
      localStorage.setItem('wishlist', updateWishlist);
      })
      .catch(error => {
      console.error('Server reported an error: ', error.message)
      console.error('error code: ', error.code)
      console.error('http status: ', error.status)
      })
    } else {
      this.inWishlist = true;
      console.log('Already in your wishlist!');
    }


  let getGameData = Backendless.Data.of('games').findById(gameId)
 .then(currentGame => { return currentGame; })
 .catch(error => { console.log(error); });

  getGameData.then(result => {
    //console.log(JSON.stringify(result));
    this.currentGameData = result;    
  })
   
      let newGameWishlist: any;

      if(!this.currentGameData.wishlist) {
        newGameWishlist = this.currentUserData.objectId;
        this.inWishlist = true;
        Backendless.Data.of('games').save({objectId: gameId, wishlist: newGameWishlist })
        .then(savedGame => { console.log('FINAL 1: ' + savedGame); })
        .catch(error => { console.error(error.message); });
        } else if(this.currentGameData.wishlist.indexOf(this.currentUserData.objectId) === -1) {
          this.inWishlist = true;
          let currentGameWishlist = this.currentGameData.wishlist;
          newGameWishlist = currentGameWishlist.split(',');
          newGameWishlist.push(gameId);
  
          let updateWishlist = newGameWishlist.toString();
          console.log(gameId + '||||' + updateWishlist);
          
          Backendless.Data.of('games').save({objectId: gameId, wishlist: updateWishlist })
            .then(savedGame => { console.log('FINAL2: ' + savedGame); })
            .catch(error => { console.error(error.message); });
        } else {  
        this.inWishlist = true;
        console.log('Already in your Wishlist!');
      } 
        
  
  }


  ngOnDestroy(): void {
    // localStorage.removeItem('currentGameId');
  }

}
