var http = require('http');

var contentServer = http.createServer(function (req, res) {
    res.writeHead(200);
    var shtml = '';
    shtml += '<script src="/socket.io/socket.io.js"></script>';
    shtml += '<script>';
    shtml += 'var socket = io.connect(\'http://localhost\');';
    shtml += 'socket.on(\'update:mylink\', function (data) {';
    shtml += 'console.log(data);';
    shtml += '});';
    shtml += '</script>';
    res.end(shtml);
}).listen(8080);

module.exports = contentServer;
