import { Component, OnInit } from '@angular/core';
import { BlogartikelService } from '../blogartikel.service';
import { Months } from '../data';
import { UpdateComponentListener } from '../update-component-listener';

@Component({
  selector: 'app-monthlist',
  templateUrl: './monthlist.component.html',
  styleUrls: ['./monthlist.component.css']
})
export class MonthlistComponent implements OnInit, UpdateComponentListener {

  Months = Months;
  MonthCounts = [0,0,0,0,0,0,0,0,0,0,0,0]
  constructor(private service: BlogartikelService) { }
  ngOnInit(): void {
    this.service.addUpdateComponentListener(this)
    this.reload();
  }

  reload(){
    this.service.getMonths().subscribe((newCounts)=>{
      this.MonthCounts = newCounts;
    })
  }
}
