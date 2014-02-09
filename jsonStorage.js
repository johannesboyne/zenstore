var levelup = require('levelup');
var storage = levelup('./zenstorage');
var nametable = levelup('./nametable');

module.exports.store = function (options, fn) {
    if (!options.id) {
        return null;
    }
    storage.put(options.id, options.data, fn);
};

module.exports.link = function (id, name) {
    nametable.put(name, id);    
};

function _get (id, fn) {
    storage.get(id, function (err, value) {
        if (err) {
            if (err.notFound)  return fn('["nothing found"]'); // nothing found
            else return fn('["system error"]');
        }
        return fn(value);
    });
}

module.exports.get = _get;

module.exports.getForName = function (name, fn) {
    nametable.get(name, function (err, id) {
        if (err)
            if (err.notFound) return fn('["nothing found"]');
        _get(id, fn);
    });
};
