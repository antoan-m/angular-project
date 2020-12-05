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

  constructor(private router: Router) {}

  currentGameData;
  game;

  ngOnInit(): void {
  let currentGameId = getGameId();
   console.log(currentGameId);


  this.currentGameData = Backendless.Data.of('games').findById(currentGameId)
 .then(result => {
   console.log('Current Data: ' + result);
  })
 .catch(error => {
  console.log(error);
  });

  }

  ngOnDestroy(): void {
    localStorage.removeItem('currentGameId');
  }



  editGame(currentGameId) {
  this.currentGameData = Backendless.Data.of('games').findById(currentGameId)
 .then(result => {
   console.log(result);
  })
 .catch(error => {
  console.log(error);
  });

  // this.game = {
  //   title: this.currentGameData.title,
  //   image: this.currentGameData.image,
  //   description: this.currentGameData.description,
  //   bullets: this.currentGameData.bullets,
  //   requirements: this.currentGameData.requirements,
  //   price: this.currentGameData.price,
  //   youtube_url: this.currentGameData.youtube_url
  //   };

 
  this.game.title = this.form.value.title,
  this.game.image = this.form.value.image,
  this.game.description = this.form.value.description,
  this.game.bullets = this.form.value.bullets,
  this.game.requirements = this.form.value.requirements,
  this.game.price = this.form.value.price,
  this.game.youtube_url = this.form.value.youtube_url


Backendless.Data.of('games').save(this.game)
  .then(function(savedGame) {
      console.log(savedGame);
    })
  .catch( function( error ) {
      console.error(error.message);
    });

  }

  cancelGameEdit() {
    localStorage.removeItem('currentGameId');
    this.router.navigate(['games/my-games']);
  }


}