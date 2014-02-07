var linkCreator = require('./linkCreator'),
    jsonStorage = require('./jsonStorage'),
    jade = require('jade');

require('http').createServer(function (req, res) {
    if (req.method === 'POST' && req.url.length === 41) {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk.toString();
        });
        req.on('end', function () {
            if (data.length > 0) {
                jsonStorage.store({id: req.url.replace(/\//, ''), data: data});
                res.writeHead(200, {'content-type': 'application/json'});
                res.end(data);
            }
        });
    } else {
        if (req.url.length === 41) {
            res.writeHead(200, {'content-type': 'application/json'});
            jsonStorage.get(req.url.replace(/\//, ''), function (value) {
                res.end(value);
            });
        } else {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(jade.renderFile('./zenstore.jade', {zenlink: req.headers.host + '/' + linkCreator.createLink()}));
        }
    }
}).listen(process.env.PORT || 1337);
