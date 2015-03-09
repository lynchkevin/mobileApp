var http = require('http');

var httpProxy = require('http-proxy')

//var proxy = httpProxy.createProxyServer();

var webServer = {target:'http://localhost:8080'};
var nodeServer = {target:'http://localhost:3000'}
var proxy = httpProxy.createProxyServer({});
        
/*var proxyServer = httpProxy.createServer(
    function(req, res, proxy){
        proxy.proxyRequest(req,res,{target:'http://localhost:3000'});
    } 
).listen(8000);
*/
http.createServer(function(req,res){
    var match = req.url.match(/api/);
    var target = webServer
    
    if(match !==null){
        console.log(match);
        target = nodeServer;
        console.log(target);
    }

 
    proxy.web(req,res,target);
}).listen(8000);

console.log('proxy1 listening on port 8000');
           