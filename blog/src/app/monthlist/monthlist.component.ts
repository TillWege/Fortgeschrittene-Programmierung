import { Component, OnInit, Input } from '@angular/core';
import { Artikel } from '../artikel';
import { Months } from '../data';

@Component({
  selector: 'app-monthlist',
  templateUrl: './monthlist.component.html',
  styleUrls: ['./monthlist.component.css']
})
export class MonthlistComponent implements OnInit {

  Months = Months;
  constructor() { }
  @Input() ArtikelList?: Map<Number,Artikel>;
  ngOnInit(): void {
  }

  GetNumOfArticlesInMonth(Month: String): number {
    let Result = 0;
    this.ArtikelList?.forEach((Value, Key)=>{
      if(Key == -1){  // Placeholder Artikel ignorieren
        return;
      }
      if(Months[(Value.publishDate.getMonth())]==Month){
        Result++;
      }
    })

    return Result;
  }

}
