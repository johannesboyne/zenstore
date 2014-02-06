var localStorage = {};
module.exports.store = function (options) {
    if (!options.id) {
        return null;
    }
    localStorage[options.id] = options.data;
};

module.exports.get = function (id) {
    return String(localStorage[id]);
};
