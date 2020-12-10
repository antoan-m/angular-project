import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(private router: Router, private orderPipe: OrderPipe) {

    this.sortedCollection = orderPipe.transform(this.games, this.order);

  }
  //order games 
  order: string = 'created';
  sortedCollection: any[];
  reverse: boolean = true;
  sortDirection: string = 'DESC';

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  games;


  ngOnInit(): void {

var queryBuilder = Backendless.DataQueryBuilder.create();
queryBuilder.setPageSize(6);

    let getGamesData = Backendless.Data.of('games').find(queryBuilder)
    .then(function(currentGames) {
      return currentGames;
     })
    .catch(function (error) {
      console.error(error)
     })
   
     getGamesData.then(result => {
       //console.log('GAMES: ' + JSON.stringify(result));
       this.games = result;
     })

  }

  getGameId(id) {
    if(!id) {
      id = localStorage.getItem('currentGameId');
    }
    //console.log(id);
    localStorage.setItem('currentGameId', id);
    return id;
  }

}
