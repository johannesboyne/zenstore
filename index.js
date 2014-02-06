var linkCreator = require('./linkCreator'),
    jsonStorage = require('./jsonStorage');

require('http').createServer(function (req, res) {
    if (req.url.length === 41) {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(jsonStorage.get(req.url.replace(/\//, '')));
    } else {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end('your private zenstorage URL is: ' + req.headers.host + '/' + linkCreator.createLink());
    }
}).listen(process.env.PORT || 1337);
