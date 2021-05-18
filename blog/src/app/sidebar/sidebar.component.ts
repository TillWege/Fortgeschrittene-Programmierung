import { Component, OnInit, Input} from '@angular/core';
import { Artikel } from '../artikel';
import { Months } from '../data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  Months = Months;
  Query!: String;

  @Input() ArtikelList?: Map<Number,Artikel>;
  constructor() { }

  ngOnInit(): void {
    this.Query = "";
  }
}
