const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');

        res.write('<html>');
        res.write('<head><title>Enter message</title> </head>');
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"><button type="submit"> Send</button></form> </body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        //on() ==== listen to certain events
        req.on('data', (chunk) => {
            console.log('chunk', chunk);
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            console.log('message =', message);
        })
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<head><title>My First Page</title> </head>');
    res.write('<body><h1> Hello from my NodeJs Server</h1> </body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);