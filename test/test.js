var test = require('tap').test,
    jsonStorage = require('../jsonStorage'),
    linkCreator = require('../linkCreator');

test('zenstorage json-storage and link creation', function (t) {
    t.equal(linkCreator.createLink().length, 40, 'link is 40 chars long');
    var _tlink = linkCreator.createLink();
    var _json = '[{"elapsed":703.5669999999931,"lastTick":"2014-02-06T08:14:33.533Z","description":"Team-Meeting","running":false,"runningSince":false,"$$hashKey":"00X","current":false,"now":"2014-02-06T08:14:33.533Z"},{"elapsed":10321.36300000005,"lastTick":"2014-02-06T10:18:10.968Z","description":"Testing, #FIL-554, #FIL-566","running":false,"runningSince":false,"current":false,"$$hashKey":"011","now":"2014-02-06T10:18:10.968Z"},{"elapsed":0,"lastTick":null,"description":"","running":false,"runningSince":null,"$$hashKey":"015"},{"elapsed":5350.450000000157,"lastTick":"2014-02-06T12:22:52.081Z","description":"Refactoring","running":false,"runningSince":false,"current":false,"$$hashKey":"019","now":"2014-02-06T12:22:52.081Z"},{"elapsed":1535.5929999999657,"lastTick":"2014-02-06T12:55:54.394Z","description":"Refactoring, Bugfixing","running":true,"runningSince":"2014-02-06T12:55:54.394Z","current":true,"$$hashKey":"01D","now":"2014-02-06T12:55:54.394Z"}]';
    jsonStorage.store({id: _tlink, data: _json}, function () {
        jsonStorage.get(_tlink, function (value) {
            t.equal(value, _json, 'json properly stored and received');
            t.end();
        });
    });
});

test('zenstorage should link names', function (t) {
    var _tlink = linkCreator.createLink();
    var _json = '{"test": 1}';
    jsonStorage.store({id: _tlink, data: _json}, function () {
        jsonStorage.link(_tlink, 'myname', function () {
            jsonStorage.getForName('myname', function (value) {
                t.equal(value, _json, 'got json for linked storage');
                t.end();
            });
        });
    });
});

test('zenstorage should do computations', function (t) {
    var _tlink = linkCreator.createLink();
    var _json = '{"test": 1}';
    jsonStorage.store({id: _tlink, data: _json}, function () {
        jsonStorage.linkComputation({id: _tlink, script: 'var output = data.test - 1;'}, function () {
            jsonStorage.get(_tlink, function (value) {
                t.equal(value, '0', 'computation is correct');
                jsonStorage.unlinkComputation(_tlink, function () {
                    jsonStorage.get(_tlink, function (v2) {
                        t.equal(v2, _json);
                        t.end();
                    });
                });
            });
        });
    });
});
