var linkCreator = require('./linkCreator'),
    jsonStorage = require('./jsonStorage'),
    jade = require('jade');

require('http').createServer(function (req, res) {
    if ((req.method === 'POST' || req.method === 'PUT') && (req.url.length === 41 || req.url.length === 48)) {
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
        // generate zenlink
        if (req.url.match(/\/createZenlink\//)) {
            var _id = req.url.replace(/\/createZenlink\//, '').split('/')[0];
            var _name = req.url.replace(/\/createZenlink\//, '').split('/')[1];
            jsonStorage.link(_id, _name);
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify({link: { id: _id, name: _name }}));
        } else if (req.url.match(/\/zenlink\//)) {
            // request zenlinks data
            res.writeHead(200, {'content-type': 'application/json'});
            jsonStorage.getForName(req.url.replace(/\/zenlink\//, ''), function (value) {
                res.end(value);
            });
        } else if (req.url.length === 41) {
            // request 'secret' zenstorage
            res.writeHead(200, {'content-type': 'application/json'});
            jsonStorage.get(req.url.replace(/\//, ''), function (value) {
                res.end(value);
            });
        } else if(req.url === '/create') {
            // create 'secret' zenstorage
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify({zenlink: req.headers.host + '/' + linkCreator.createLink()}));
        } else {
            // hello page
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(jade.renderFile('./zenstore.jade', {zenlink: req.headers.host + '/' + linkCreator.createLink()}));
        }
    }
}).listen(process.env.PORT || 1337);
