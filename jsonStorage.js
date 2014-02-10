var levelup = require('levelup');
var storage = levelup('./zenstorage');
var nametable = levelup('./nametable');
var computations = levelup('./computations');
var vm = require('vm');

module.exports.store = function (options, fn) {
    if (!options.id) {
        return null;
    }
    storage.put(options.id, options.data, fn);
};

module.exports.link = function (id, name, fn) {
    nametable.put(name, id, fn);    
};

function _get (id, fn) {
    var data = '["nothing found"]';
    storage.get(id, function (err, value) {
        if (err) {
            if (err.notFound)  return fn(data); // nothing found
            else return fn('["system error"]');
        }
        data = value;
        computations.get(id, function (err, script) {
            if (err) {
                if (err.notFound) return fn(data);
            }
            try {
                var sb = {};
                vm.runInNewContext('var data = ' + data + ';' + script , sb, 'myfile.vm');
                fn(JSON.stringify(sb.output));
            } catch (e) {
                fn(data);
            }
        });
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

module.exports.linkComputation = function (options, fn) {
    computations.put(options.id, options.script, fn);
};
module.exports.unlinkComputation = function (id, fn) {
    computations.del(id, fn);
};
