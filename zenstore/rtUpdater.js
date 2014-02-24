var socketio = require('socket.io');
var _ = require('highland');
var JSONStream = require('JSONStream');

module.exports = function (jsonStorage, server, tcp) {
  var io = socketio.listen(server);
  var sockets = [];

  io.sockets.on('connection', function (socket) {
    console.log('socket connected');
    sockets.push({type: 'websocket', socket: socket});
  });
  tcp.on('connection', function(c) { //'connection' listener
    console.log('client connected');
    var scraper = JSONStream.parse();
    scraper.on('data', function (obj) {
      c.__id = Math.random();
      if (obj.hasOwnProperty('zen') && obj.zen.update) sockets.push({name: obj.zen.name, socket: c, id: c.__id});
      else console.log('incoming data flow');
    });
    scraper.on('end', function () {
      sockets = sockets.filter(function (socket) {
        return socket.id !== c.__id;
      });
    });
    c.pipe(scraper);
  }); 

  jsonStorage.listen.on('update:name', function (name, data) {
    sockets
    .filter(function (sock) { return (sock.name === name); })
    .forEach(function (sock) {
      sock.socket.write(data);
    });
    // this section needs to be refactored!
    sockets
    .filter(function (sock) { return (sock.type === 'websocket' ? true : false); })
    .forEach(function (sock) {
      sock.socket.volatile.emit(('update:'+name), {'name': name, 'data': JSON.parse(data)});
    });
  });
};
