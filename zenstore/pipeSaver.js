var events = require('events'),
_ = require('highland'),
JSONStream = require('JSONStream');

module.exports = function (tcpserver, jsonStorage) {
  var emitter = new events.EventEmitter();
  tcpserver.on('connection', function (client) {
    var pipeId = null;
    var json = {};
    var scraper = JSONStream.parse();
    scraper.on('data', function (obj) {
      if (obj.hasOwnProperty('zen') && obj.zen.pipeData) {
        pipeId = obj.zen.id;
      } else if (pipeId) {
        json = _.extend(json, obj);
      }
    });
    scraper.on('end', function () {
      if (pipeId) {
        jsonStorage.store({id: pipeId, data: JSON.stringify(json)}, function () {
          emitter.emit('stored', json);
        });
      }
    });
    client.pipe(scraper);
  });
  return emitter;
};

