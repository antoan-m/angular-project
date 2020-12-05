import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Backendless from 'backendless';


@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  @ViewChild('e', { static: false }) form: NgForm;

  constructor(private router: Router) { }

  currentGameData;
  game: Object;

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

  }

  ngOnDestroy(): void {
    localStorage.removeItem('currentGameId');
  }


// update game info
editGame(currentGameId) {
  let objectId = localStorage.getItem('currentGameId');
  this.currentGameData = Backendless.Data.of('games').findById({objectId})
 .then(result => {
   console.log(result);
  })
 .catch(error => {
  console.log(error);
  });

  this.game = {
  objectId: objectId,
  title: this.form.value.title,
  image: this.form.value.image,
  description: this.form.value.description,
  bullets: this.form.value.bullets,
  requirements: this.form.value.requirements,
  price: this.form.value.price,
  youtube_url: this.form.value.youtube_url
  }

Backendless.Data.of('games').save(this.game)
  .then(savedGame => {
      console.log(savedGame);
      localStorage.removeItem('currentGameId');
      this.router.navigate(['games/my-games']);
    })
  .catch(error => {
      console.error(error.message);
    });
  }

  cancelGameEdit() {
    localStorage.removeItem('currentGameId');
    this.router.navigate(['games/my-games']);
  }


}