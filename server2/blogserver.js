var fs = require('fs');
var http = require('http');
var express = require('express');
var cors = require('cors')
const multipart = require('connect-multiparty');

var app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/Assets'));

const multipartMiddleware = multipart({
    uploadDir: './Assets'
});

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
    let month = req.query.month;
    let tempmap = articles;
    if (!((query == undefined) || (query == ''))) {
        tempmap = getArticlesByQuery(query, tempmap)
    }
    if (!((tag == undefined) || (tag == ''))) {
        tempmap = getArticlesByTag(tag, tempmap)
    }
    if (!((month == undefined) || (month == ''))) {
        tempmap = getArticlesByMonth(month, tempmap)
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

app.get('/months', (req, res) => {
    let r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    articles.forEach((value) => {
        r[new Date(value.publishDate).getMonth()]++
    })
    res.contentType('application/json').status(200).send(r)
})

app.get('/login', (req, res) => {
    let usr = req.query.usr;
    let pwd = req.query.pwd;

    if ((usr == 'User') && (pwd == 'User')) {
        res.contentType('application/json').status(200).send(JSON.stringify({ success: true, state: 1 }))
    } else if ((usr == 'Admin') && (pwd == 'Admin')) {
        res.contentType('application/json').status(200).send(JSON.stringify({ success: true, state: 2 }))
    } else {
        res.contentType('application/json').status(200).send(JSON.stringify({ success: false, state: 0 }))
    }
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
        res.contentType('application/json').status(200).send(JSON.stringify({ success: true, id: id }))
    } catch (error) {
        res.contentType('application/json').status(400).send(JSON.stringify({ success: false }))
    }
})

app.post('/image', multipartMiddleware, (req, res) => {
    res.contentType('application/json').status(200).send(JSON.stringify({ success: true, path: req.files.uploads[0].path }))
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

function getArticlesByMonth(month, map) {
    let newMap = new Map()
    map.forEach((value, key) => {
        if (new Date(value.publishDate).getMonth() == month) {
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