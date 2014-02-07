var levelup = require('levelup');
var storage = levelup('./zenstorage');
module.exports.store = function (options) {
    if (!options.id) {
        return null;
    }
    storage.put(options.id, options.data);
};

module.exports.get = function (id, fn) {
    storage.get(id, function (err, value) {
        if (err) {
            if (err.notFound)  return fn('["othing found"]'); // nothing found
        }
        return fn(value);
    });
};
