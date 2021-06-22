var http = require("http");
var url = require('url');

var server = http.createServer(serve);
server.listen(3000);

function serve(req, res) {
    console.log(req.headers);
    console.log('------------')
    console.log('URL: ' + req.url);

    if (req.url === "/favicon.ico") {
        res.end();
        return;
    } else {
        let Result = '';
        res.writeHead(200, {
            "content-type": "text/plain"
        });
        let Kategorie = req.url.substring(2, req.url.indexOf('='))
        let Stichwort = req.url.substring(req.url.indexOf('=') + 1)

        switch (Kategorie) {
            case 'order':
                switch (Stichwort) {
                    case 'food':
                        if (Math.random() > 0.5) {
                            Result = "Chips";
                        } else {
                            Result = "Schokolade"
                        }
                        break;
                    case 'drink':
                        if (Math.random() > 0.5) {
                            Result = "Wasser";
                        } else {
                            Result = "Cola"
                        }
                        break;
                }
                break;
            case 'location':
                switch (Stichwort) {
                    case 'city':
                        if (Math.random() > 0.5) {
                            Result = "Moers";
                        } else {
                            Result = "Duisburg"
                        }
                        break;
                }
                break;
        }
        if (!Result) {
            Result = "Fehler! Keine passenden Daten gefunden"
        }
        res.write(Result);


        res.end();
    }


}