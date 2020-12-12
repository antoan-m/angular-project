import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
  inWishlist: Boolean = false;
  safeSource: SafeResourceUrl;

  constructor(private router: Router, private sanitizer: DomSanitizer, private gameService: GameService, private userService: UserService, 
    private cdRef: ChangeDetectorRef) {

      
  //get current game data from server 

  let objectId = localStorage.getItem('currentGameId');
  //console.log('ID: ' + objectId);

 let getGameData = Backendless.Data.of('games').findById({objectId})
.then(currentGame => {
  //console.log('Current Data: ' + JSON.stringify(currentGame));
  return currentGame;
 })
.catch(error => {
 console.log(error);
 });

 getGameData.then(result => {
   //console.log(JSON.stringify(result));
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

   //check if user is Publisher / Game is in Wishlist / Bought
   getUserData.then(result => {
    this.currentUserData = result;  
    if (this.currentUserData.publisher) {
      this.publisherMenu = true;
    } else {
      this.publisherMenu = false;
    }
    if(!this.currentUserData.wishlist) {
      this.inWishlist = false;
    } else {
    let currentWishlist = this.currentUserData.wishlist.split(',');
    if(currentWishlist.indexOf(this.currentGameData.objectId) !== -1) {
      this.inWishlist = true;
    } else {
      this.inWishlist = false;
    }
    }
    if(!this.currentUserData.orders) {
      this.gameBought = false;
    } else {
    let currentOrders = this.currentUserData.orders.split(',');
    if(currentOrders.indexOf(this.currentGameData.objectId) !== -1) {
      this.gameBought = true;
    } else {
      this.gameBought = false;
    }
  }
  
  })
  
  
}

  

  ngOnInit(): void {

  //check if game is already bought
  // if(this.currentUserData.orders.find(this.currentGameData.objectId)) {
  //   this.gameBought = true;
    //console.log(this.gameBought);
    //console.log(this.currentUserData.orders)
  //}

//check if user is publisher of the game
if(this.currentUserData.objectId === this.currentGameData.ownerId) {
  this.owner = true;
  //console.log('OWNER: ' + this.owner);
} else {
  this.owner = false;
  //console.log(this.owner)
}
  
  }

//buy game
  updateOrders;
  sales;
  currentUserOrders;
  currentGameOrders;

  buyGame(gameId) {

      class AppUser extends Backendless.User {
        orders: String;
       }
    
    const user: AppUser = new AppUser();
    
    user.objectId = this.currentUserData.objectId;

      if (!this.currentUserData.orders) {
        this.currentUserOrders = gameId;
      } else {
        this.currentUserOrders = this.currentUserData.orders.split(',');
        if(this.currentUserOrders.indexOf(gameId) !== -1) {
          this.gameBought = true;
          //console.log('Game already bought!');
          M.toast({html: 'Game already bought!'});
      } else {
        this.currentUserOrders.push(gameId);
        //console.log(this.orders);
      }
      }

    user.orders = this.currentUserOrders.toString();

    //console.log('user.orders: ' +  user.orders);
    
    Backendless.UserService.update(user)
      .then(success => {
      //console.log('Game bought!');
      })
      .catch(error => {
      console.error('Server reported an error: ', error.message)
      console.error('error code: ', error.code)
      console.error('http status: ', error.status)
      })

      //add order in game table
      if (!this.currentGameData.orders) {
        this.updateOrders = this.currentUserData.objectId;
        this.sales = 1;
      } else {
        this.currentGameOrders = this.currentGameData.orders.split(',');
        if(this.currentGameOrders.indexOf(gameId) !== -1) {
      this.currentGameOrders.push(this.currentUserData.objectId);
      this.updateOrders = this.currentGameOrders.toString();
      this.sales = Number(this.currentGameData.sales) + 1;
    }
  }
      Backendless.Data.of('games').save({ objectId: gameId, orders: this.updateOrders, sales: this.sales })
        .then(savedOrder => {
       //console.log(savedOrder);
       M.toast({html: 'Game bought!'});
       this.gameBought = true;
        })
        .catch(error => {
        console.error(error);
        });
      

  }

  //add game to wishlist
  addGameToWishlist(gameId: string) {

    //get user data
  let getUserData = Backendless.UserService.getCurrentUser()
 .then(function(currentUser) {
   return currentUser;
  })
 .catch(function (error) {
   console.error(error)
  })

  getUserData.then(result => {
    //console.log('User: '+ JSON.stringify(result));
    this.currentUserData = result;
  })


let wishlist = this.currentUserData.wishlist;
if (wishlist) {
  wishlist = this.currentUserData.wishlist.split(',');
} else {
  wishlist = '';
}


// console.log('WISHLIST: ' + wishlist);
// console.log('ID' + gameId);


if(!this.currentUserData.wishlist) {
  wishlist = wishlist.toString();
  Backendless.UserService.update({objectId: this.currentUserData.objectId, wishlist: gameId})
      .then(success => {
      //console.log(JSON.stringify(success) + 'Game added to your wishlist!');
      this.inWishlist = true;
      //localStorage.setItem('wishlist', gameId);
      })
      .catch(error => {
      console.error('Server reported an error: ', error.message)
      console.error('error code: ', error.code)
      console.error('http status: ', error.status)
      })
    } else if (wishlist.indexOf(gameId) === -1) {

    wishlist.push(gameId);

    let updateWishlist = wishlist.toString();

    Backendless.UserService.update({objectId: this.currentUserData.objectId, wishlist: updateWishlist})
      .then(success => {
      //console.log(JSON.stringify(success) + 'Added to your wishlist!');
      this.inWishlist = true;
      //localStorage.setItem('wishlist', updateWishlist);
      })
      .catch(error => {
      console.error('Server reported an error: ', error.message)
      console.error('error code: ', error.code)
      console.error('http status: ', error.status)
      })
    } else if (this.currentUserData.wishlist && wishlist.indexOf(gameId) !== -1) {
      this.inWishlist = true;
      //console.log('Already in your wishlist!');
    }

//get game data
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
        .then(savedGame => { console.log('Game added to Wishlist!: ' + savedGame);
        M.toast({html: 'Game added to Wishlist!'}); })
        .catch(error => { console.error(error.message); });
        } else if(this.currentGameData.wishlist.indexOf(this.currentUserData.objectId) === -1) {
          this.inWishlist = true;
          let currentGameWishlist = this.currentGameData.wishlist;
          newGameWishlist = currentGameWishlist.split(',');
          newGameWishlist.push(gameId);
  
          let updateWishlist = newGameWishlist.toString();
          
          Backendless.Data.of('games').save({objectId: gameId, wishlist: updateWishlist })
            .then(savedGame => { console.log('Game addded to Wishlist!: ' + savedGame);
            M.toast({html: 'Game added to Wishlist!'}); })
            .catch(error => { console.error(error.message); });
        } else {  
        this.inWishlist = true;
        //console.log('Already in your Wishlist!');
        M.toast({html: 'Game already to Wishlist!'})
      }
        
  
  }


  ngOnDestroy(): void {
    //localStorage.removeItem('currentGameId');
  }

}
