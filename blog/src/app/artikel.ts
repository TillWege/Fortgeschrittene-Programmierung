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

export const Placeholder = new Artikel("-1","Placeholder Überschrift","Placeholder Author",new Date(),"Placeholder Beschreibung","/assets/image.jpg","Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",["Tag1","Tag2"]);
