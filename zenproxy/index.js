// zenproxy
var httpProxy = require('http-proxy');
var proxy = httpProxy.createServer({
    router: {
        'localhost:8080/zenstore' : 'http://127.0.0.1:1337',
        'localhost:8080/'         : 'http://127.0.0.1:8081'
    }
}).listen(8080);
