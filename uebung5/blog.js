console.log(articles)

let ArtikelDiv = document.getElementsByClassName("Artikel").item(0)
articles.forEach(article => {
    let newArtikel = createArticle(article)
    ArtikelDiv.appendChild(newArtikel)
})
let SidebarDiv = document.getElementById("Sidebar")
SidebarDiv.appendChild(createSidebar(articles))


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
        //Infos.innerHTML = article.author + "|" + article.publishDate;
    Infos.innerHTML = `${article.author}|${article.publishDate}`
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

function createSidebar(Articles) {
    let sidebar = document.createElement("aside")
    let login = createLogin()
    sidebar.appendChild(login)
    let searchbar = createSearchbar()
    sidebar.appendChild(searchbar)
    let monthList = createMonthList()
    sidebar.appendChild(monthList)
    let tagCloud = createTagCloud(Articles)
    sidebar.appendChild(tagCloud)
    return sidebar
}

function createLogin() {
    let loginform = document.createElement("form")
    loginform.setAttribute("action", "login.html")

    let group1 = document.createElement("div")
    group1.classList.add("form-group")
    group1.classList.add("row")

    let usernamelabel = document.createElement("label")
    usernamelabel.setAttribute("for", "usernameinput")
    usernamelabel.classList.add("col-sm-3")
    usernamelabel.classList.add("col-form-label")
    usernamelabel.innerHTML = "Benutzername"
    group1.appendChild(usernamelabel)

    let emailinputdiv = document.createElement("div")
    emailinputdiv.classList.add("col-sm-7")
    let emailinput = document.createElement("input")
    emailinput.setAttribute("type", "text")
    emailinput.classList.add("form-control")
    emailinput.id = "usernameinput"
    emailinput.setAttribute("placeholder", "Benutzername")
    emailinputdiv.appendChild(emailinput)
    group1.appendChild(emailinputdiv)
    loginform.appendChild(group1)


    let group2 = document.createElement("div")
    group2.classList.add("form-group")
    group2.classList.add("row")

    let passwordlabel = document.createElement("label")
    passwordlabel.setAttribute("for", "passwordinput")
    passwordlabel.classList.add("col-sm-3")
    passwordlabel.classList.add("col-form-label")
    passwordlabel.innerHTML = "Passwort"
    group2.appendChild(passwordlabel)

    let passwordinputdiv = document.createElement("div")
    passwordinputdiv.classList.add("col-sm-7")
    let passwordinput = document.createElement("input")
    passwordinput.setAttribute("type", "password")
    passwordinput.classList.add("form-control")
    passwordinput.id = "passwordinput"
    passwordinput.setAttribute("placeholder", "Passwort")
    passwordinputdiv.appendChild(passwordinput)
    group2.appendChild(passwordinputdiv)
    loginform.appendChild(group2)

    let group3 = document.createElement("div")

    group3.classList.add("form-group")
    group3.classList.add("row")
    let logindiv = document.createElement("div")
    logindiv.classList.add("col")

    let loginbtn = document.createElement("button")
    loginbtn.setAttribute("type", "submit")
    loginbtn.classList.add("btn")
    loginbtn.classList.add("btn-outline-primary")
    loginbtn.innerHTML = "Login"
    group3.appendChild(loginbtn)

    logindiv.appendChild(group3)
    loginform.appendChild(logindiv)

    return loginform

}

function createSearchbar() {
    let searchbarForm = document.createElement("form")
    searchbarForm.setAttribute("action", "suchergebnis.html")

    searchbardiv = document.createElement("div")
    searchbardiv.classList.add("form-group")
    searchbardiv.classList.add("row")
    searchbardiv.classList.add("no-gutters")

    let inputdiv = document.createElement("div")
    inputdiv.classList.add("col-8")
    let textinput = document.createElement("input")
    textinput.classList.add("form-control")
    textinput.setAttribute("type", "text")
    textinput.setAttribute("placeholder", "Suchen...")
    inputdiv.appendChild(textinput)

    searchbardiv.appendChild(inputdiv)
    searchbarForm.appendChild(searchbardiv)


    let inputbtndiv = document.createElement("div")
    inputbtndiv.classList.add("col")
    let btninput = document.createElement("button")
    btninput.classList.add("btn")
    btninput.classList.add("btn-outline-primary")
    btninput.setAttribute("type", "submit")
    btninput.innerHTML = "Suchen"

    searchbardiv.appendChild(btninput)
    return searchbarForm
}

function createMonthList() {
    let list = document.createElement("ul")
    list.classList.add("list-group")
    let Months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    Months.forEach(month => {
        let listItem = document.createElement("li")
        listItem.classList.add("list-group-item")
        listItem.classList.add("d-flex")
        listItem.classList.add("justify-content-between")
        listItem.classList.add("align-items-center")
        let link = document.createElement("a")
        link.setAttribute("href", "monatsliste.html")
        link.innerText = month
        listItem.appendChild(link)
        let span = document.createElement("span")
        span.classList.add("badge")
        span.classList.add("badge-primary")
        span.classList.add("badge-pill")
        span.innerHTML = random(0, 20)
        listItem.appendChild(span)
        list.appendChild(listItem)
    })

    return list
}

function createTagCloud(Articles) {
    let TagCloudDiv = document.createElement("div")
    TagCloudDiv.classList.add("Tagcloud")
    let map = new Map()
    let highest = 0;
    debugger
    Articles.forEach(article => {
        article.tags.forEach(tag => {
            if (map.has(tag)) {
                let i = parseInt(map.get(tag))
                i++;
                highest = i > highest ? i : highest
                map.set(tag, i)
            } else {
                map.set(tag, 1)
            }
        })
    })
    map.forEach((value, key) => {
        let tagobj = document.createElement("a")
        tagobj.setAttribute("href", "tagliste.html")
        tagobj.innerHTML = key
        tagobj.style.fontSize = (parseInt(value) / highest) * 30 + "px"
        TagCloudDiv.appendChild(tagobj)
    })

    return TagCloudDiv
}