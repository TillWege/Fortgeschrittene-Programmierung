window.onload = function() {
    console.log(articles[0])
    var headinginput = document.getElementById("headinginput")
    var authorinput = document.getElementById("authorinput")
    var descriptioninput = document.getElementById("descriptioninput")
    var textinput = document.getElementById("textinput")
    var taginput = document.getElementById("taginput")
    var imginput = document.getElementById("imginput")
    headinginput.value = articles[0].heading
    authorinput.value = articles[0].author
    descriptioninput.value = articles[0].description
    textinput.value = articles[0].text
    taginput.value = articles[0].tags
}

function saveArticle() {
    console.log(new Artikel(headinginput.value, authorinput.value, new Date(), descriptioninput.value,
        imginput.value, textinput.value, taginput.value.split(',')))
}