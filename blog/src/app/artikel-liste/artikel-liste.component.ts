import { Component, OnInit } from '@angular/core';
import { ArtikelMap } from '../data';
import { ActivatedRoute, Router } from '@angular/router';
import { Artikel } from '../artikel';

@Component({
  selector: 'app-artikel-liste',
  templateUrl: './artikel-liste.component.html',
  styleUrls: ['./artikel-liste.component.css']
})
export class ArtikelListeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  ArtikelMap = ArtikelMap;
  filteredMap!: Map<number, Artikel>;
  ShowFull!: boolean;
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.ShowFull = true;
    this.filteredMap = new Map<number,Artikel>();
    console.log(this.route.snapshot.paramMap.get('tag'))
    if(!(this.route.snapshot.paramMap.get('tag')===null)){
      let searchtag = this.route.snapshot.paramMap.get('tag')
      this.ArtikelMap.forEach((artikel,id) => {
        artikel.tags.forEach((tag)=>{
          if(tag==searchtag){
            if(!this.filteredMap.has(id)){
              this.filteredMap.set(id, artikel);
            }
          }
        })
      });
      this.ArtikelMap = this.filteredMap;
    }else if(!(this.route.snapshot.paramMap.get('query')==null)){
      let searchquery = this.route.snapshot.paramMap.get('query')!
      this.ArtikelMap.forEach((artikel,id) => {
        if(artikel.author.includes(searchquery)||artikel.description.includes(searchquery)||artikel.heading.includes(searchquery)||artikel.text.includes(searchquery)){
          this.filteredMap.set(id, artikel);
        }
      });
      this.ArtikelMap = this.filteredMap;
    }

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
}
