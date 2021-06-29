import { Component, OnInit } from '@angular/core';
import { Artikel, Placeholder } from '../artikel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogartikelService } from '../blogartikel.service';

@Component({
  selector: 'app-artikel-editor',
  templateUrl: './artikel-editor.component.html',
  styleUrls: ['./artikel-editor.component.css']
})
export class ArtikelEditorComponent implements OnInit {

  artikel!: Artikel;
  artikelID!: number;
  tagsstring!: String;
  datestring!: String;
  fileToUpload: File | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private service: BlogartikelService) { }

  ngOnInit(): void {
    this.artikelID = parseInt(this.route.snapshot.paramMap.get('id')??'-1')
    this.artikel = Placeholder
    this.service.getArticleByID(this.artikelID).subscribe(article => {
      this.artikel = article
      this.tagsstring = article.tags.toString()
      this.artikel.publishDate = new Date(article.publishDate)
      this.datestring = this.artikel.publishDate.toISOString()
      this.datestring = this.datestring.substring(0,this.datestring.indexOf('T'))
    })

  }

  updateArticle(){
    this.artikel.tags = [...new Set(this.tagsstring.split(','))];
    this.artikel.publishDate = new Date(this.datestring.toString())
    this.service.updateArticle(this.artikel).subscribe((result:any)=>{
      if(result.success){
        this.router.navigate(["articles"])
      }else{
        window.alert("Es ist ein Fehler aufgetreten")
      }
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.service.uploadImage(this.fileToUpload!).subscribe(result => {
      if(result.success){
        this.artikel.image = result.path.split('\\')[1]
      }else{
        window.alert("Beim upload ist ein Fehler aufgetreten")
      }
    })
  }
}
