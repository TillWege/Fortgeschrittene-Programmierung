import { Component, OnInit, Input} from '@angular/core';
import { Artikel } from '../artikel';
import { ArtikelMap } from '../data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css']
})


export class ArtikelComponent implements OnInit {

  @Input() artikelid!: number;
  @Input() showFull!: boolean;

  artikel!: Artikel;
  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    if(this.showFull==undefined){
      if(this.route.snapshot.paramMap.get('display')=="compact"){
        this.showFull = false;
      }else{
        this.showFull = true;
      }
    }
    if(this.artikelid === undefined){
      this.artikelid = parseInt(this.route.snapshot.paramMap.get('id')??'-1')
    }
    if(ArtikelMap.has(this.artikelid)){
      this.artikel = ArtikelMap.get(this.artikelid)!
    }else{
      this.artikel = ArtikelMap.get(-1)!
    }
  }

}
