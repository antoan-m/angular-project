import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private router: Router) {}

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
       console.log(result);
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


  getAllGames() {

    // Backendless.Data.of('games').find()
    //  .then(game => {
    //    console.log(game);
    //   })
    //  .catch(error => {
    //   console.log(error);
    //   });

  }



}
