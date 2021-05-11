class Artikel {
    constructor(heading, author, publishDate, description, image, text, tags, id) {
        this.heading = heading
        this.author = author
        this.publishDate = publishDate;
        this.description = description
        this.image = image
        this.text = text
        this.tags = tags
        this.id = id
    }
}

var articles = new Map() //Hier 'var' verwenden damit articles in blog.js genutzt werden kann

let article1 = new Artikel(
    "Überschrift1",
    "Author1",
    new Date(2021, 0, 1),
    "Artikelbeschreibung",
    "medien/image.jpg",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut" +
    "labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores" +
    "et ea rebum. Stet clita kasd gubergren, no sea takimata", ["Tag1", "Tag2"],
    "1"
)

articles.set(article1.id, article1)

let article2 = new Artikel(
    "Überschrift2",
    "Author1",
    new Date(2021, 1, 5),
    "Artikelbeschreibung",
    "medien/image.jpg",
    "ArtikelText2", ["Tag2", "Tag3"],
    "2"
)

articles.set(article2.id, article2)

let article3 = new Artikel(
    "Überschrift3",
    "Author2",
    new Date(2021, 5, 1),
    "Artikelbeschreibung",
    "medien/image.jpg",
    "Lorem ipsum dolor sit amet", ["Tag1", "Tag3"],
    "3"
)

articles.set(article3.id, article3)

let article4 = new Artikel(
    "Überschrift4",
    "Author3",
    new Date(2021, 7, 14),
    "Artikelbeschreibung",
    "medien/image.jpg",
    "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", ["Tag3"],
    "4"
)

articles.set(article4.id, article4)