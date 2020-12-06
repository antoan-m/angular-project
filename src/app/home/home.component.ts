import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

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
       console.log('GAMES: ' + JSON.stringify(result));
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

}
