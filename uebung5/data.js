class Artikel {
    constructor(heading, author, publishDate, description, image, text, tags) {
        this.heading = heading
        this.author = author
        this.publishDate = publishDate;
        this.description = description
        this.image = image
        this.text = text
        this.tags = tags
    }
}

var articles = [] //Hier 'var' verwenden damit articles in blog.js genutzt werden kann

let article1 = new Artikel(
    "Überschrift1",
    "Author1",
    "1.1.2000",
    "Artikelbschreibung",
    "medien/image.jpg",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut" +
    "labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores" +
    "et ea rebum. Stet clita kasd gubergren, no sea takimata", ["Tag1", "Tag2"]
)

articles.push(article1)

let article2 = new Artikel(
    "Überschrift2",
    "Author1",
    "5.1.2000",
    "Artikelbschreibung",
    "medien/image.jpg",
    "ArtikelText2", ["Tag2", "Tag3"]
)

articles.push(article2)

let article3 = new Artikel(
    "Überschrift3",
    "Author2",
    "5.1.2001",
    "Artikelbschreibung",
    "medien/image.jpg",
    "Lorem ipsum dolor sit amet", ["Tag1", "Tag3"]
)

articles.push(article3)

let article4 = new Artikel(
    "Überschrift4",
    "Author3",
    "5.1.2001",
    "Artikelbschreibung",
    "medien/image.jpg",
    "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", ["Tag3"]
)

articles.push(article4)