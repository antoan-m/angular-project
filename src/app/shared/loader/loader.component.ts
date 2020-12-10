import { Component, Input } from '@angular/core';
import { LoadersCSS } from 'ngx-loaders-css';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})


export class LoaderComponent {

  @Input() loading: boolean;

  loader: LoadersCSS = 'pacman';
  bgColor = 'black';
  color = 'rgba(100, 100, 100, 0.5)';
  scale = 3;


  constructor() {}

}