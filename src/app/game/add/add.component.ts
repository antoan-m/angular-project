import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { title } from 'process';
import { GameService } from '../game.service';

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

  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit() {
  }
  
  fileToUpload: File = null;
  gameImagesDir = 'games'


  // handleFileInput(files: FileList) {
    
  //     this.fileToUpload = files.item(0);
    
  //     this.gameService.postFile(this.fileToUpload, this.gameImagesDir).subscribe(data => {
  //       // do something, if upload success
  //       }, error => {
  //         console.log(error);
  //       });
  //     }

 userRegForm: any;

 addGameCall() {
          //console.log(`Data before sending: ${JSON.stringify(this.form.value)}`);
          this.userRegForm = this.form.value;
          this.gameService.addGame(this.userRegForm)
      }


// addGame() {

//     console.log(`Data before sending: ${JSON.stringify(this.form.value)}`);

//     var game = {
//     title: this.form.value.name,
//     imagefile: this.form.value.imageUrl,
//     // image: this.form.value.imageUrl,
//     image: "https://demo.jpg",
//     description: this.form.value.description,
//     bullets: this.form.value.bullets,
//     requirements: this.form.value.requirements,
//     price: this.form.value.price,
//     youtube_url: this.form.value.youtubeTrailerUrl
//   }

//   console.log(game);
    
//   this.gameService.postFile(game.imagefile, this.gameImagesDir, true);

// Backendless.Data.of('games').save(game)
//   .then(savedObject => {
//     console.log(savedObject);
//   M.toast({html: 'Game added successfully!'}),
//   this.router.navigate(['games/my-games'])
//   })
// .catch(function(error) {
//     console.log('Error: ' + error.message);
//   });

//   }
  


}