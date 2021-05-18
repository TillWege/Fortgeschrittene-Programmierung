import { Component, OnInit, Input } from '@angular/core';
import { Artikel } from '../artikel';

@Component({
  selector: 'app-tagcloud',
  templateUrl: './tagcloud.component.html',
  styleUrls: ['./tagcloud.component.css']
})
export class TagcloudComponent implements OnInit {

  constructor() { }

  @Input() ArtikelList?: Map<Number,Artikel>;
  TagList!: Map<String, Number>;
  Highest!: Number;

  ngOnInit(): void {
    this.TagList = new Map();
    this.Highest = 1;
    this.ArtikelList?.forEach((Value)=>{
      Value.tags.forEach((Tag)=>{
        if(this.TagList.has(Tag)){
          let a = this.TagList.get(Tag) ?? 0;
          this.TagList.set(Tag,a.valueOf()+1);
          if((a.valueOf()+1)>this.Highest){
            this.Highest = a.valueOf()+1;
          }
        }else{
          this.TagList.set(Tag,1);
        }
      })
    })
  }

  GetFontsizeOfTag(Tag: String): String{
    let n = this.TagList.get(Tag)?.valueOf() ?? 1;
    console.log((n / this.Highest.valueOf()) * 30);
    return String((n / this.Highest.valueOf()) * 30)+'px';
  }
}
