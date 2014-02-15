var jade = require('jade');
module.exports.create = function (httpServer) {
    httpServer.pre(function (req, res, next) {
        if (req.url.match(/\/follow/)) {
           res.writeHead(200, {'Content-Type': 'text/html'});
           var shtml = jade.renderFile(__dirname + '/zenstore.jade');
           res.end(shtml);
        } else {
            next();
        }
    });
};
