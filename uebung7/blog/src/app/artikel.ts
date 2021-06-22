export class Artikel{
  id : string;
  heading: string;
  author: string;
  publishDate: Date;
  description: string;
  image: string;
  text: string;
  tags: string[];



  constructor(id: string,heading: string,author: string,publishDate: Date, description: string,image: string,text: string,tags: string[]){
    this.id = id;
    this.heading = heading;
    this.author = author;
    this.publishDate = publishDate;
    this.description = description;
    this.image = image;
    this.text = text;
    this.tags = tags;
  }
}
