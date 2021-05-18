import { Component, OnInit } from '@angular/core';
import { Artikel } from '../artikel';
import { ArtikelMap } from '../data';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artikel-editor',
  templateUrl: './artikel-editor.component.html',
  styleUrls: ['./artikel-editor.component.css']
})
export class ArtikelEditorComponent implements OnInit {

  artikel!: Artikel;
  artikelID!: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.artikelID = parseInt(this.route.snapshot.paramMap.get('id')??'-1')
    if(ArtikelMap.has(this.artikelID)){
      this.artikel = ArtikelMap.get(this.artikelID)!
    }else{
      this.artikel = ArtikelMap.get(-1)!
    }
  }

}
