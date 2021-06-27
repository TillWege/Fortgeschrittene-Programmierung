var fs = require('fs');
var http = require('http');
var express = require('express');
var cors = require('cors')

var app = express();
app.use(express.json())
app.use(cors())
var server = http.createServer(app);
// Wichtig! Synchrone version nutzen um Race condition zu verhindern
let jsondata = fs.readFileSync("./articles.json")
let articles = new Map(JSON.parse(jsondata))

server.listen(3200);

// Event Handeler für den Exit Code aus STDIN
process.on('SIGINT', () => {
    console.log('Exiting')

    // Wichtig! Synchrone version nutzen um Race condition zu verhindern    
    fs.writeFileSync('articles.json', JSON.stringify([...articles]))

    //"Echtes" beenden des Programms
    process.exit()
})


app.get('/articles', (req, res) => {
    let query = req.query.query;
    let tag = req.query.tag;
    let tempmap = articles;
    if (!((query == undefined) || (query == ''))) {
        tempmap = getArticlesByQuery(query, tempmap)
    }
    if (!((tag == undefined) || (query == ''))) {
        tempmap = getArticlesByTag(tag, tempmap)
    }
    res.contentType('application/json').status(200).send(JSON.stringify([...tempmap]))

});

app.get('/article/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let art = getArticleById(id, articles);
    if (art == null) {
        res.contentType('text/html').status(404).send('Kein passender Artikel gefunden')
    } else {
        res.contentType('application/json').status(200).send(art)
    }
})

app.get('/tags', (req, res) => {
    let tagmap = new Map()
    articles.forEach((value, key) => {
        value.tags.forEach((tag) => {
            let n = tagmap.get(tag)
            if (n == undefined) {
                tagmap.set(tag, 1)
            } else {
                tagmap.set(tag, n + 1)
            }
        })
    })
    res.contentType('application/json').status(200).send(JSON.stringify([...tagmap]))
})

app.get('*', (req, res) => {
    res.contentType('text/html').status(200).send('Hier läuft ein Blog Server');
});

app.put('/article/:id', (req, res) => {
    try {
        articles.set(parseInt(req.params.id), {
            id: parseInt(req.params.id),
            author: req.body.author,
            description: req.body.description,
            heading: req.body.heading,
            image: req.body.image,
            publishDate: req.body.publishDate,
            text: req.body.text,
            tags: req.body.tags
        })
        res.contentType('application/json').status(200).send(JSON.stringify({ success: true }))
    } catch (error) {
        res.contentType('application/json').status(400).send(JSON.stringify({ success: false }))
    }
})

app.post('/articles', (req, res) => {
    try {
        let id = getRandomID(articles)
        articles.set(id, {
            id: id,
            author: req.body.author,
            description: req.body.description,
            heading: req.body.heading,
            image: req.body.image,
            publishDate: req.body.publishDate,
            text: req.body.text,
            tags: req.body.tags
        })
        res.contentType('application/json').status(200).send(JSON.stringify({ success: true }))
    } catch (error) {
        res.contentType('application/json').status(400).send(JSON.stringify({ success: false }))
    }
})

app.delete('/article/:id', (req, res) => {
    let id = parseInt(req.params.id)
    if (articles.has(id)) {
        articles.delete(id)
        res.contentType('application/json').status(200).send(JSON.stringify({ success: true }))
    } else {
        res.contentType('application/json').status(400).send(JSON.stringify({ success: false }))
    }
})

function getArticleById(id, map) {
    return map.get(id)
}

function getArticlesByTag(pTag, map) {
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

function getArticlesByQuery(query, map) {
    let newMap = new Map()
    map.forEach((value, key) => {
        if (value.author.includes(query) || value.description.includes(query) || value.heading.includes(query) || value.text.includes(query)) {
            newMap.set(key, value)
        }
    })
    return newMap
}

function getRandomID(map) {
    let done = false;
    let id = -1;
    while (!done) {
        id = Math.floor(Math.random() * 10000);
        done = !map.has(id)
    }
    return id
}