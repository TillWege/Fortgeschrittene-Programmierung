import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artikel } from '../artikel';
import { BlogartikelService } from '../blogartikel.service';
import { Months } from '../data';
import { UpdateComponentListener } from '../update-component-listener';

@Component({
  selector: 'app-artikel-liste',
  templateUrl: './artikel-liste.component.html',
  styleUrls: ['./artikel-liste.component.css']
})
export class ArtikelListeComponent implements OnInit, UpdateComponentListener {

  ArtikelMap!: Map<number, Artikel>;
  filteredMap!: Map<number, Artikel>;
  ShowFull!: boolean;
  TagParam!: String;
  QueryParam!: String;
  MonthParam!: string;
  showFilters!: boolean;
  MonthSelected!: String;
  Months = Months;
  constructor(private route: ActivatedRoute, private router: Router, private service: BlogartikelService) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.ShowFull = true;
    this.service.addUpdateComponentListener(this);
    this.TagParam   = this.route.snapshot.paramMap.get('tag') ?? '';
    this.QueryParam = this.route.snapshot.paramMap.get('query') ?? '';
    this.MonthParam = this.route.snapshot.paramMap.get('month') ?? '';
    if((this.TagParam!='')||(this.QueryParam!='')||(this.MonthParam!='')){
      this.showFilters = true
    }else{
      this.showFilters = false
    }
    this.reload();

    if(this.route.snapshot.paramMap.get('display')=='full'){
      this.ShowFull = true;
    }else if(this.route.snapshot.paramMap.get('display')=='compact'){
      this.ShowFull = false;
    }
  }

  setFull(){
    this.ShowFull = true;
  }

  setCompact(){
    this.ShowFull = false;
  }

  newArticle(){
    let n = new Artikel('','Neuer Artikel','',new Date(),'','','',['']);
    this.service.createArticle(n).subscribe((res:any)=>{
      if(res.success){
        this.router.navigate(["edit",res.id])
      }else{
        window.alert("Es ist ein Fehler aufgetreten")
      }
    })
  }

  resetMonth(){
    if(!(document.getElementById("monthselect")==null)){
      (<HTMLSelectElement>document.getElementById("monthselect")).selectedIndex = 1;
    }

  }

  dofilter(){
    this.reload()
  }

  reload(){
    this.service.getArticles(this.TagParam.toString(),this.QueryParam.toString(),this.MonthParam).subscribe((JSON)=>{
      this.ArtikelMap = new Map<number,Artikel>(JSON);
    })
  }
}
