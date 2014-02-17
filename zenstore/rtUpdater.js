var socketio = require('socket.io');
var net = require('net');

module.exports = function (jsonStorage, server) {
    var io = socketio.listen(server);
    var sockets = [];

    io.sockets.on('connection', function (socket) {
        console.log('socket connected');
        sockets.push({type: 'websocket', socket: socket});
    });

    var tcpserver = net.createServer(function(c) { //'connection' listener
        console.log('tcpserver connected');
        c.on('data', function (d) {
            if (d.toString().match(/update/)) {
                sockets.push({type: 'tcp', name: d.toString(), socket: c});
            }
        });
        c.on('end', function() {
            console.log('tcpserver disconnected');
        });
    });
    tcpserver.listen(8124, function() { //'listening' listener
        console.log('tcpserver bound');
    });

    jsonStorage.listen.on('update:name', function (name, data) {
        sockets
        .filter(function (sock) { return (sock.name === 'update:'+name ? true : false); })
        .forEach(function (sock) {
            sock.socket.write(data);
            sock.socket.pipe(sock.socket);
        });
        // this section needs to be refactored!
        sockets
        .filter(function (sock) { return (sock.type === 'websocket' ? true : false); })
        .forEach(function (sock) {
            sock.socket.volatile.emit(('update:'+name), {'name': name, 'data': JSON.parse(data)});
        });
    });
};
