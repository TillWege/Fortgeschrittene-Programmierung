var http = require("http");

class Artikel {
    constructor(id, heading, author, publishDate, description, image, text, tags) {
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


var server = http.createServer(serve);
server.listen(3000);

let artikelMap = new Map();
artikelMap.set(-1, new Artikel("-1", "Placeholder Überschrift", "Placeholder Author", new Date(), "Placeholder Beschreibung", "/assets/image.jpg", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", ["Tag1", "Tag2"]))
artikelMap.set(1, new Artikel("1", "Überschrift1", "Author1", new Date(), "Beschreibung1", "/assets/image.jpg", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", ["Tag1", "Tag2"]))
artikelMap.set(2, new Artikel("2", "Überschrift2", "Author2", new Date(), "Beschreibung2", "/assets/image.jpg", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", ["Tag1", "Tag2"]))



function serve(req, res) {
    console.log(req.headers);
    console.log('------------')
    console.log('URL: ' + req.url);

    if (req.url === "/favicon.ico") {
        res.end();
        return;
    } else if (req.url.startsWith("/articles")) {
        res.writeHead(200, {
            "content-type": "application/json"
        });
        let tempmap = artikelMap
        const path = new URL(req.url, 'http://localhost:3000/');
        let query = path.searchParams.get('query')
        let tagquery = path.searchParams.get('tag')
        console.log(query + "  " + tagquery)
        if (query) {
            tempmap = getArticlesByQuery(tempmap, query)
        }
        if (tagquery) {
            tempmap = getArticlesByTag(tempmap, tagquery)
        }
        console.log(tempmap)
        res.write(JSON.stringify([...tempmap]))
        res.end()
    } else if (req.url.startsWith("/article/")) {
        let id = parseInt(req.url.substring(9))
        if (artikelMap.has(id)) {
            res.writeHead(200, {
                "content-type": "application/json"
            });
            res.end(JSON.stringify(getArticleById(id)))
        } else {
            res.writeHead(404, {
                "content-type": "text/plain"
            });
            res.write('Passender Artikel nicht gefunden');
            res.end();
        }
    } else {
        res.writeHead(200, {
            "content-type": "text/plain"
        });
        res.write('Placeholder Text');
        res.end();
    }
}

function getArticleById(id) {
    return artikelMap.get(id)
}

function getArticlesByTag(map, pTag) {
    let newMap = new Map()
    map.forEach((value, key) => {
        value.tags.forEach((tag) => {
            if (tag.toLowerCase() === pTag.toLowerCase()) {
                newMap.set(key, value)
            }
        })
    })
    return newMap;
}

function getArticlesByQuery(map, query) {
    let newMap = new Map()
    map.forEach((value, key) => {
        if (value.author.includes(query) || value.description.includes(query) || value.heading.includes(query) || value.text.includes(query)) {

            newMap.set(key, value) // ToDo Filtern auf duplikate


        }
    })
    return newMap
}