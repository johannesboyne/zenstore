var crypto = require('crypto');
module.exports.createLink = function () {
    var shasum = crypto.createHash('sha1');
    shasum.update(String(Math.random()*99999+Math.random()*999999));
    return shasum.digest('hex'); 
};
