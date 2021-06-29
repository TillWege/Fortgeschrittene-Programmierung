import { Component, OnInit, Input } from '@angular/core';
import { Artikel } from '../artikel';
import { BlogartikelService } from '../blogartikel.service';
import { UpdateComponentListener } from '../update-component-listener';

@Component({
  selector: 'app-tagcloud',
  templateUrl: './tagcloud.component.html',
  styleUrls: ['./tagcloud.component.css']
})
export class TagcloudComponent implements OnInit,UpdateComponentListener {

  constructor(private service: BlogartikelService) {

  }

  TagList!: Map<String, number>;
  Highest!: Number;

  ngOnInit(): void {
    this.TagList = new Map<String, number>();
    this.service.addUpdateComponentListener(this);
    this.Highest = 0;
    this.reload();
  }

  GetFontsizeOfTag(Tag: String): String{
    let n = this.TagList.get(Tag) ?? 1;
    return String((n / this.Highest.valueOf()) * 30)+'px';
  }

  reload(){
    this.service.getTags().subscribe((pTagList)=>{
      this.TagList = new Map<String, number>(pTagList)
      this.TagList.forEach((value)=>{
        if(value>this.Highest){
          this.Highest = value;
        }
      })
    })
  }

}
