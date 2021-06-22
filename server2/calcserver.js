var http = require('http');

var express = require('express');
var app = express();


app.use(express.static(__dirname + '/webapp'));


var server = http.createServer(app);

server.listen(3000);

app.get('/:op/:op1/:op2', function(req, res) {
    let op = req.params.op
    let op1 = req.params.op1
    let op2 = req.params.op2
    if (isNaN(op1) || isNaN(op2)) {
        res.contentType('text/html').status(400).send('Fehlerhafte Nummer Operatoren')
    } else {
        let Result = 0
        switch (op) {
            case 'add':
                Result = parseFloat(op1) + parseFloat(op2)
                break
            case 'sub':
                Result = parseFloat(op1) - parseFloat(op2)
                break
            case 'mul':
                Result = parseFloat(op1) * parseFloat(op2)
                break
            case 'div':
                Result = parseFloat(op1) / parseFloat(op2)
                break
            default:
                res.contentType('text/html').status(400).send('Fehlerhafter Rechenoperatoren')
        }
        if (!res.headersSent) {
            res.contentType('text/html').status(200).send(String(Result));
        }
    }
});


app.get('*', function(req, res) {
    res.contentType('text/html').status(200).send('Hello World');
});

/*
app.get('/add/:op1/:op2', function(req, res) {
    let op1 = req.params.op1
    let op2 = req.params.op2
    if (isNaN(op1) || isNaN(op2)) {
        res.contentType('text/html').status(400).send('Fehlerhafte Operatoren');
    } else {
        let Result = parseFloat(op1) + parseFloat(op2)
        res.contentType('text/html').status(200).send(String(Result));
    }
});
app.get('/sub/:op1/:op2', function(req, res) {
    let op1 = req.params.op1
    let op2 = req.params.op2
    if (isNaN(op1) || isNaN(op2)) {
        res.contentType('text/html').status(400).send('Fehlerhafte Operatoren');
    } else {
        let Result = parseFloat(op1) - parseFloat(op2)
        res.contentType('text/html')
        res.status(200).send(String(Result));
    }
});
app.get('/mul/:op1/:op2', function(req, res) {
    let op1 = req.params.op1
    let op2 = req.params.op2
    if (isNaN(op1) || isNaN(op2)) {
        res.contentType('text/html').status(400).send('Fehlerhafte Operatoren');
    } else {
        let Result = parseFloat(op1) * parseFloat(op2)
        res.contentType('text/html')
        res.status(200).send(String(Result));
    }
});
app.get('/div/:op1/:op2', function(req, res) {
    let op1 = req.params.op1
    let op2 = req.params.op2
    if (isNaN(op1) || isNaN(op2)) {
        res.contentType('text/html').status(400).send('Fehlerhafte Operatoren');
    } else {
        let Result = parseFloat(op1) / parseFloat(op2)
        res.contentType('text/html')
        res.status(200).send(String(Result));
    }
});
*/