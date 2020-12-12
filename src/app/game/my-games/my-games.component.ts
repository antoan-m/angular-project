import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { GameService } from '../game.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  constructor(private router: Router, private GameService: GameService) { }

games: any;
currentUserData: any;
userId: any;

ngOnInit() {

let getUserData = Backendless.UserService.getCurrentUser()
.then(function(currentUser) {
  return currentUser;
 })
.catch(function (error) {
  console.error(error)
 })

getUserData.then(result => {
  //console.log(result);
   this.currentUserData = result; 
   this.userId = this.currentUserData.objectId;

   //console.log('Userid: ' + this.userId);

   const whereClause = "ownerId='" + this.userId + "'";
   const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause).setSortBy(['title']);;
   let getGamesData = Backendless.Data.of('games').find(queryBuilder)
   .then(function(currentGames) {
     return currentGames;
    })
   .catch(function (error) {
     console.error(error)
    })
  
    getGamesData.then(result => {
      //console.log(JSON.stringify(result));
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

deleteGame(id) {
  console.log(id);
  Backendless.Data.of('games').remove( { objectId: id } )
 .then(timestamp => {
  //console.log('Game deleted: ' + id);
  M.toast({html: 'Game deleted!'});
  })
 .catch(error => {
  console.log(error);
  });

  }

  removeRow(event) {
  // const el = document.querySelector('td .game-delete');
  // const row = el.parentElement.parentElement.parentElement;
  const td = event.target.parentNode; 
  const tr = td.parentNode.parentNode; // the row to be removed
  tr.parentNode.removeChild(tr);
  }


}
