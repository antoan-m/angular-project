import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})


export class GamesComponent implements OnInit {

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

    // const whereClause = "";
    // const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause).setSortBy(['created DESC']);

    // var queryBuilder = Backendless.DataQueryBuilder.create();
    // queryBuilder.setPageSize(4).setOffset(8);
    // queryBuilder.prepareNextPage();

    let getGamesData = Backendless.Data.of('games').find()
    .then(function(currentGames) {
      return currentGames;
     })
    .catch(function (error) {
      console.error(error)
     })

     getGamesData.then(result => {
      // console.log(result);
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
