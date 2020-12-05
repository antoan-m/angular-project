import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';

// const APP_ID = 'E6A1D0AD-587C-48AC-FF2E-1B06CF656400';
// const API_KEY = '2021AF52-B726-491E-A32B-D1E474D20AEF';

// Backendless.initApp(APP_ID, API_KEY);

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  @ViewChild('g', { static: false }) form: NgForm;

  constructor(private router: Router) {}

  ngOnInit() {
  }

addGame() {

    console.log(`Data before sending: ${JSON.stringify(this.form.value)}`);

  // class Game {
  //     title: string;
  //     image: string;
  //     description: string;
  //     bullets: string;
  //     requirements: string;
  //     youtube_url: string;
  //  }
    
   var game = {
    title: this.form.value.name,
    image: this.form.value.imageUrl,
    description: this.form.value.description,
    bullets: this.form.value.bullets,
    requirements: this.form.value.requirements,
    price: this.form.value.price,
    youtube_url: this.form.value.youtubeTrailerUrl
  }

  console.log(game);

Backendless.Data.of('games').save(game)
  .then(savedObject => {
    console.log(savedObject);
  // M.toast({html: 'Game added successfully!'}),
  this.router.navigate(['games/my-games'])
  })
.catch(function(error) {
    console.log('an error has occurred' + error.message);
  });

  }
  
}