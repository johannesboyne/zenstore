var http = require('http');
var jade = require('jade');

var contentServer = http.createServer(function (req, res) {
    res.writeHead(200);
    var shtml = jade.renderFile(__dirname + '/zenstore.jade');
    res.end(shtml);
}).listen(8081);
console.log('zenwebapp listening at http://0.0.0.0:8081');
module.exports = contentServer;
