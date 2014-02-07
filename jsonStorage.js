var levelup = require('levelup');
var storage = levelup('./zenstorage');
module.exports.store = function (options, fn) {
    if (!options.id) {
        return null;
    }
    storage.put(options.id, options.data, fn);
};

module.exports.get = function (id, fn) {
    storage.get(id, function (err, value) {
        if (err) {
            if (err.notFound)  return fn('["nothing found"]'); // nothing found
            else return fn('["system error"]');
        }
        return fn(value);
    });
};
