import { Component } from '@angular/core';
import { ArtikelMap } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog';
  ArtikelMap = ArtikelMap;
}
