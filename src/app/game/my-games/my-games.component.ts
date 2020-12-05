import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  constructor(private router: Router) { }

 games;

  ngOnInit(): void {

    let getGamesData = Backendless.Data.of('games').find()
    .then(function(currentGames) {
      return currentGames;
     })
    .catch(function (error) {
      console.error(error)
     })
   
     getGamesData.then(result => {
       console.log(JSON.stringify(result));
       this.games = result;    
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

  deleteGame() {

    // this.router.navigate(['games/my-games']);
  }


}
