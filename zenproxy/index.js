// zenproxy
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

require('http').createServer(function(req, res) {
    if (req.url.length === 1 || req.url.match(/\/follow/)) proxy.web(req, res, { target: 'http://localhost:8081' });
    else if (req.url.match(/\/socket/)) proxy.web(req, res, { target: 'http://localhost:8082' });
    else proxy.web(req, res, { target: 'http://localhost:8082' });
}).listen(process.env.PORT ||80);
