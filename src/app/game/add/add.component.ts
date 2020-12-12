import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Backendless from 'backendless';
import { GameService } from '../game.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  @ViewChild('g', { static: false }) form: NgForm;

  constructor(private router: Router, public gameService: GameService) {}

  ngOnInit() {
  }
  
  fileToUpload: File = null;
  gameImagesDir = 'games'


 userRegForm: any;

 addGameCall() {
          this.userRegForm = this.form.value;
          this.gameService.addGame(this.userRegForm)
      }


}