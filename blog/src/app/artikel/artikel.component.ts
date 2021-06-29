import { Component, OnInit, Input} from '@angular/core';
import { Artikel, Placeholder } from '../artikel';
import { ActivatedRoute } from '@angular/router';
import { BlogartikelService } from '../blogartikel.service';
import { LoginStates } from '../data';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css']
})


export class ArtikelComponent implements OnInit {

  @Input() artikelid!: number;
  @Input() showFull!: boolean;

  artikel!: Artikel;
  constructor(private route: ActivatedRoute, private service: BlogartikelService) {  }

  ngOnInit(): void {
    this.artikel = Placeholder;
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
    this.service.getArticleByID(this.artikelid).subscribe((pArtikel)=>{
      //Date Type Fixen
      pArtikel.publishDate = new Date(pArtikel.publishDate)
      this.artikel = pArtikel;

    })
  }

  isAdmin():Boolean{
    return this.service.loginState==LoginStates.Admin;
  }

  isUser():Boolean{
    return this.service.loginState>=LoginStates.User;
  }

  getImagePath(): string{
    let a = this.service.getServerURL()+this.artikel.image
    console.log(a)
    return a
  }

  delete(){
    this.service.deleteArticleByID(this.artikel.id).subscribe((result:any)=>{
      if(!result.success){
        window.alert("Es ist ein Fehler aufgetreten")
      }
    })
  }

}
