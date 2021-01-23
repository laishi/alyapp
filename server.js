var http = require('http');
var httpProxy = require('http-proxy');
 
var proxy = httpProxy.createProxyServer({});
 
proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.');
});
 
var server = require('http').createServer(function(req, res) {
  var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("client ip:" + ip + ", host:" + host);
  
  switch(host){
    case 'cqsgjs.com':
        proxy.web(req, res, { target: '148.70.212.82:9898' });
    break;
    case 'mskznzm.com':
        proxy.web(req, res, { target: '148.70.212.82:3030' });
    break;
    
    default:
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Welcome to my aly server!');
  }
});
 
console.log("listening on port 80")
server.listen(80);