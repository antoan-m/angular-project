import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from "materialize-css";


@Injectable({
  providedIn: 'root'
})

export class GameService {

  constructor(private router: Router) {}

  currentGameId;
  serverError;

  getGameId(id) {
    if(!id) {
      id = localStorage.getItem('currentGameId');
    }
    console.log(id);
    localStorage.setItem('currentGameId', id);
    return this.currentGameId
  }


  // postFile(files: any, path: any, overwrite: boolean){

  // Backendless.Files.upload(files, path, overwrite)
  //   .then(fileURL => {
  //      console.log( "File successfully uploaded. Path to download: " + fileURL );
  //      M.toast({html: fileURL})
  //    })
  //   .catch(error => {
  //      console.log( "error - " + error.message );
  //      M.toast({html: error, file})
  //    });
  // }

  imageFileName: any;
  newImageFileName: any;
  fileToUpload: File = null;
  file: any;
  newFileNameLink: any;

  addGame(addGameForm: any) {

  //   console.log(`Data before sending: ${JSON.stringify(this.form.value)}`);

  
  
//   let filename = addGameForm.imageUrl;
//   console.log("filename: " + filename);


//   var file = new File([filename], this.newImageFileName, {
//     type: "multipart/form-data",
//   });

//   //upload game image
// Backendless.Files.upload(file, 'games', true)
// .then(result => {
//    console.log("File uploaded. URL: " + JSON.stringify(result));
//    M.toast({html: 'UPLOADED FILE: ' + JSON.stringify(result)});
//    this.newFileNameLink = result;
//  })
// .catch(error => {
//    console.log( "error - " + error.message );
//    M.toast({html: error})
//  });


    var game = {
    title: addGameForm.title,
    // imagefile: this.newFileNameLink,
    image: addGameForm.imageUrl,
    description: addGameForm.description,
    bullet1: addGameForm.requirements1,
    bullet2: addGameForm.requirements2,
    bullet3: addGameForm.requirements3,
    bullet4: addGameForm.requirements4,
    bullet5: addGameForm.requirements5,
    price: addGameForm.price,
    youtube_id: addGameForm.youtubeId
  }

  // console.log('GAME: ' + JSON.stringify(game));
  // console.log('Image: ' + this.newImageFileName);
  
     
//upload all game data
Backendless.Data.of('games').save(game)
  .then(savedObject => {
    //console.log(savedObject);
  M.toast({html: 'Game added successfully!'}),
  this.router.navigate(['games/my-games'])
  })
  .catch(error => 
    console.error('Can not Register User:', error.message,
    M.toast({html: error.message}),
    this.serverError = error
    ));
  }


}
