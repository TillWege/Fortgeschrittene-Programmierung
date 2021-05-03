console.log(articles)
let ArtikelDiv = document.getElementsByClassName("Artikel").item(0)
articles.forEach(article => {
    let newArtikel = createArticle(article)
    ArtikelDiv.appendChild(newArtikel)
})




function createArticle(article) {
    //Zentralen Artikel-Tag erstellen
    let ArticleTag = document.createElement("article")

    //Header des Artikels
    let Heading = document.createElement("div")
    Heading.classList.add("Überschriften");
    let ArticleLink = document.createElement("a")
    ArticleLink.setAttribute("href", "artikel.html")
    let ArticleHeading = document.createElement("h2")
    ArticleHeading.innerHTML = article.heading
    ArticleLink.appendChild(ArticleHeading)
    Heading.appendChild(ArticleLink)
    let Infos = document.createElement("h3")
    Infos.innerHTML = article.author + "|" + article.publishDate;
    let Description = document.createElement("h4")
    Description.innerHTML = article.description
    let Image = document.createElement("img")
    Image.setAttribute("src", article.image)

    Heading.appendChild(Infos)
    Heading.appendChild(Description)
    Heading.appendChild(Image)
    ArticleTag.appendChild(Heading)

    //Inhalt des Artikels
    let TextDiv = document.createElement("div")
    TextDiv.classList.add("Text")
    let Text = document.createElement("p")
    Text.innerHTML = article.text
    TextDiv.appendChild(Text)
    ArticleTag.appendChild(TextDiv)

    //Tags des Artikels
    let TagDiv = document.createElement("div")
    TagDiv.classList.add("Tag-Informationen")
    let Tags = document.createElement("p")
    Tags.innerHTML = "Tags:"
    article.tags.forEach(tag => {
        let Tag = document.createElement("span")
        Tag.setAttribute("onclick", "window.location.href='tagliste.html'")
        Tag.classList.add("badge")
        Tag.classList.add("rounded-pill")
        Tag.classList.add("bg-primary")
        Tag.innerHTML = tag
        Tags.appendChild(Tag)
    });
    TagDiv.appendChild(Tags)
    ArticleTag.appendChild(TagDiv)

    let SocialDiv = document.createElement("div")
    SocialDiv.classList.add("Social-Media-Informationen")
    let Socials = document.createElement("p")
    Socials.innerHTML = "Teilen auf:"

    let tsb = document.createElement("a")
    tsb.classList.add("Twitter-Share-Button")
    tsb.setAttribute("href", "https://twitter.com/intent/tweet?text=Website.com")
    tsb.innerHTML = "Twitter|"
    Socials.appendChild(tsb)

    let esb = document.createElement("a")
    esb.classList.add("E-Mail-Share-Button")
    esb.setAttribute("href", "teilenEmail.html")
    esb.innerHTML = "E-Mail|"
    Socials.appendChild(esb)

    let fsb = document.createElement("a")
    fsb.classList.add("Facebook-Share-Button")
    fsb.setAttribute("href", "http://www.facebook.com/sharer.php?u=Website.com")
    fsb.innerHTML = "Facebook"
    Socials.appendChild(fsb)
    SocialDiv.appendChild(Socials)
    ArticleTag.appendChild(SocialDiv)

    return ArticleTag
}