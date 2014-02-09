var linkCreator = require('./linkCreator'),
jsonStorage = require('./jsonStorage');

var restify = require('restify');

var server = restify.createServer({
    name: 'zenstore',
    version: '0.0.2'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', function (req, res, next) {
    res.send({link: linkCreator.createLink()});
    return next();
});
function _store (req, res, next) {
    var _json;
    try { _json = JSON.stringify(req.body); } catch (e) { return res.end('["no json"]');  }
    jsonStorage.store({id: req.params.id, data: _json});
    res.end(_json);
}
server.post('/:id', _store);
server.put('/:id', _store);
server.get('/:id', function (req, res, next) {
    jsonStorage.get(req.params.id, function (value) {
        res.end(value);
    });
});
server.get('/createZenlink/:id/:name', function (req, res, next) {
    jsonStorage.link(req.params.id, req.params.name);
    res.end(JSON.stringify({ link: { id: req.params.id, name: req.params.id } }));
});
server.get('/zenlink/:name', function (req, res, next) {
    jsonStorage.getForName(req.params.name, function (value) {
        res.end(value);
    });
});

server.listen(process.env.PORT || 1337, function () {
    console.log('%s listening at %s', server.name, server.url);
});
