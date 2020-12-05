import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router) { }

  currentGameData;
  game: Object;
  currentUserData;
  publisherMenu: Boolean = false;
  gameBought: Boolean = false;

  ngOnInit(): void {
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
  })

  //get user data
  let getUserData = Backendless.UserService.getCurrentUser()
 .then(function(currentUser) {
   return currentUser;
  })
 .catch(function (error) {
   console.error(error)
  })

  //check if user is publisher
  getUserData.then(result => {
    console.log('User: '+ JSON.stringify(result));
    this.currentUserData = result;  
    if (this.currentUserData.publisher) {
      this.publisherMenu = true;
    }  
  })

  //check if game is already bought
  if(!this.currentUserData.orders.find(this.currentGameData.objectId)) {
    this.gameBought = true;
    console.log(this.gameBought);
    console.log(this.currentUserData.orders)
    return;
}

  }

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
    console.log('CHECK ORDERS FOR ID: ' + this.currentUserData.orders.indexOf(gameId))

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
    
    


  }

  addGameToWhishlist() {

  }

  

  ngOnDestroy(): void {
    // localStorage.removeItem('currentGameId');
  }

}
