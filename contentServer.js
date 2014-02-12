var http = require('http');
var jade = require('jade');

var contentServer = http.createServer(function (req, res) {
    res.writeHead(200);
    var shtml = jade.renderFile('./zenstore.jade');
    res.end(shtml);
}).listen(8080);

module.exports = contentServer;
