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
        res.writeHead(200, {
            "content-type": "text/plain",
            'Access-Control-Allow-Origin': 'null'
        });
        console.log(req.url)

        let args = req.url.split('/')
        let n1 = parseFloat(args[2])
        let n2 = parseFloat(args[3])

        if (!args.length == 4) {
            res.write('Zu wenig Parameter');
            res.end();
            return
        }

        switch (args[1]) {
            case 'add':
                res.write((n1 + n2).toString());
                break;
            case 'sub':
                res.write((n1 - n2).toString());
                break;
            case 'mul':
                res.write((n1 * n2).toString());
                break;
            case 'div':
                res.write((n1 / n2).toString());
                break;
            default:
                res.write('Unbekannter Operand');
                break;
        }
        res.end();
    }


}