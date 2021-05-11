const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const Months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

function createArticle(article) {
    let ArticleTag = undefined
    if (article === undefined) {
        ArticleTag = $(`<articel><h4>Es wurde kein Passender Artikel gefunden</h4></article>`)
    } else {
        ArticleTag = $(`<article>
                        <div class="Überschriften">
                            <h2><a href="artikel.html?articleid=${article.id}">${article.heading}</a><a href="artikelNeu.html?articleid=${article.id}" class="btn btn-dark">Artikel bearbeiten</a></h2>
                            <h3>${article.author}|${parseInt(article.publishDate.getDate())}.${parseInt(article.publishDate.getMonth())+1}.${parseInt(article.publishDate.getFullYear())}</h3>
                            <h4>${article.description}</h4>
                            <img src="${article.image}"></img>
                        </div>
                        <div class="Text">
                            <p>${article.text}</p>
                        </div>
                        <div class="Tag-Informationen">
                            <p>Tags:${getTags()}</p>
                        </div>
                        <div class="Social-Media-Informationen">
                            <p> Teilen auf
                                <a href="https://twitter.com/intent/tweet?text=artikel.html?articleid=${article.id}">Twitter</a>|
                                <a href="teilenEmail.html?articleid=${article.id}">E-Mail</a>|
                                <a href="http://www.facebook.com/sharer.php?u=artikel.html?articleid=${article.id}">Facebook</a>
                            </p>
                        </div>
                    </article>`)
    }




    function getTags() {
        let Result = "";
        article.tags.forEach(tag => {
            Result += `<span onclick="window.location.href='tagliste.html?tag=${encodeURI(tag)}'" class="badge badge-pill badge-primary">${tag}</span>`
        });
        return Result
    }


    return ArticleTag
}

function createSidebar(Articles) {
    let sidebar = $(`<aside></aside>`)
    let login = createLogin()
    sidebar.append(login)
    let searchbar = createSearchbar()
    sidebar.append(searchbar)
    let monthList = createMonthList()
    sidebar.append(monthList)
    let tagCloud = createTagCloud(Articles)
    sidebar.append(tagCloud)
    return sidebar
}

function createLogin() {
    let loginform = $(`<form action="login.html"></form>`)

    let username = $(`<div class="form-group row">
                    <label for="usernameinput" class="col-sm-3 col-form-label">Benutzername</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" id="usernameinput" placeholder="Benutzername"></input>
                    </div>
                </div>`)


    let password = $(`<div class="form-group row">
                    <label for="passwordinput" class="col-sm-3 col-form-label">Passwort</label>
                    <div class="col-sm-7">
                        <input type="password" class="form-control" id="passwordinput" placeholder="Passwort"></input>
                    </div>
                </div>`)


    let loginbtn = $(`<div class="form-group row">
                    <div class="col">
                        <button class="btn btn-outline-primary">Login</button>
                    </div>
                </div>`)

    loginform.append(username)
    loginform.append(password)
    loginform.append(loginbtn)

    return loginform

}

function createSearchbar() {
    return $(`<form action="suchergebnis.html">
                <div class="form-group row no-gutters">
                    <div class="col-8">
                        <input class="form-control" type="text" name="query" placeholder="Suchen..."></input>
                    </div>
                    <div class="col">
                        <button class="btn btn-outline-primary" type="submit">Suchen</button>
                    </div>
                </div>  
            </form>`)
}

function createMonthList() {
    let list = $('<ul class="list-group"></ul>')
    Months.forEach(month => {
        list.append($(`<li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="monatliste.html?month=${Months.indexOf(month)}">${month}</a>
                        <span class="badge badge-primary badge-pill">${getCountOfArticlesByMonth(Months.indexOf(month))}</span></li>`))
    })

    return list
}

function getCountOfArticlesByMonth(month) {
    let Result = 0;
    articles.forEach((article) => {
        if (article.publishDate.getMonth() == month) {
            Result++;
        }
    })
    return Result;
}

function createTagCloud(Articles) {
    let TagCloudDiv = $('<div class="Tagcloud"></div>')
    let map = new Map()
    let highest = 0;
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
        let tagobj = $(`<a href="tagliste.html?tag=${encodeURI(key)}">${key}</a>`)
        tagobj.css('fontSize', (parseInt(value) / highest) * 30 + "px")
        TagCloudDiv.append(tagobj)
    })

    return TagCloudDiv
}

function saveArticle() {
    console.log(new Artikel($("#headinginput").val(), $("#authorinput").val(), new Date(), $("#descriptioninput").val(),
        "", $("#textinput").val(), $("#taginput").val().split(',')))
}

function loadArticle(article) {
    console.log(article)
    if (article == undefined) {
        window.alert("Der eingegebene Artikel konnte nicht bearbeitet werden")
    }
    $("#headinginput").val(article.heading)
    $("#authorinput").val(article.author)
    $("#descriptioninput").val(article.description)
    $("#textinput").val(article.text)
    $("#taginput").val(article.tags)
}

function getArticlesByTag(value) {
    let Result = new Map();
    articles.forEach((article) => {
        article.tags.forEach((tag) => {
            if (tag.toLowerCase() == value.toLowerCase()) {
                Result.set(parseInt(Result.size) + 1, article)
            }
        })
    })
    return Result
}

function createTagList(tag) {
    let Taglist = $(`<div><h3>Artikel mit dem Tag <span class="badge badge-pill badge-primary">${tag}</span>:</h3><div>`)
    getArticlesByTag(tag).forEach((Article) => {
        Taglist.append($(`<h3><a href="artikel.html?articleid=${Article.id}">${Article.heading}</a></h3>`))
    })
    return Taglist
}

function executeSearch(query) {
    if (query == "") {
        $('#MainContent').append($(`<h3>Fehlerhafte URL</h3>`))
        return
    }
    articles.forEach((article) => {
        if (article.heading.includes(query) || article.text.includes(query) || article.author.includes(query) || article.description.includes(query) || article.tags.includes(query)) {
            $('#MainContent').append($(`<h3><a href=artikel.html?articleid=${article.id}>${article.heading}</a></h3>`))
        }
    })
}

function findByMonth(month) {
    if (month == "") {
        $('#MainContent').append($(`<h3>Fehlerhafte URL</h3>`))
        return
    }
    $('#MainContent').append($(`<div><h3>Alle Artikel aus dem Monat ${Months[month]}</h3></div>`))
    articles.forEach((article) => {
        if (article.publishDate.getMonth() == month) {
            $('#MainContent').append($(`<h3><a href=artikel.html?articleid=${article.id}>${article.heading}</a></h3>`))
        }
    })
}