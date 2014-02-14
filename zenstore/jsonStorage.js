var levelup = require('levelup');
var storage = levelup(__dirname + '/zenstorage');
var nametable = levelup(__dirname + '/nametable');
var computations = levelup(__dirname + '/computations');
var vm = require('vm');
var EventEmitter = require('events').EventEmitter;
var liveStream = require('level-live-stream')(storage, {old: false});
liveStream.on('data', updateZenlinkSockets);

var _e = new EventEmitter();
module.exports.listen = _e;

module.exports.store = function (options, fn) {
    if (!options.id) {
        return null;
    }
    storage.put(options.id, options.data, fn);
};

module.exports.link = function (id, name, fn) {
    nametable.get(name, function (err, value) {
        if (err) {
            nametable.put(id, name, fn);
            nametable.put(name, id, fn);
            fn(true);
        } else {
            fn(false);
        }
    });
};

function updateZenlinkSockets (update) {
    nametable.get(update.key, function (err, name) {
        if (!err) {
            _get(update.key, function (data) {
                _e.emit('update:name', name, data);
            });
        }
        _e.emit('update:key', update.key);
    });
}

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
module.exports.deleteStore = function (id, fn) {
    computations.del(id);
    nametable.get(id, function (err, name) {
        if (!err) {
            nametable.del(id);
            nametable.del(name);
        }
    });
    storage.del(id, fn);
};
