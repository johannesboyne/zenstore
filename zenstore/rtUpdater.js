var socketio = require('socket.io');

module.exports = function (jsonStorage, server) {
    var io = socketio.listen(server);
    io.sockets.on('connection', function (socket) {
        jsonStorage.listen.on('update:name', function (name, data) { 
            socket.volatile.emit(('update:'+name), {'name': name, 'data': JSON.parse(data)});
            console.log('emit socket ('+'update:'+name+')');
        });
    });
};
