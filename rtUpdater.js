var io = require('socket.io').listen(8080);

module.exports = function (jsonStorage, server) {
    io.sockets.on('connection', function (socket) {
        jsonStorage.listen.on('update:name', function (name) { 
            socket.volatile.emit(('update:'+name), name);
            console.log('emit socket ('+'update:'+name+')');
        });
    });
};
