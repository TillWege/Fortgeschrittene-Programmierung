import { Component, OnInit, Input } from '@angular/core';
import { Artikel } from '../artikel';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css']
})


export class ArtikelComponent implements OnInit {

  @Input() artikel?: Artikel;

  constructor() { }

  ngOnInit(): void {
  }

}
