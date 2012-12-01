var http = require("http");
var send = require("send");
var url = require("url");

var app = http.createServer(function(req, res){

    function error(errorcode) {
      res.statusCode = errorcode.status || 500;
      res.end(errorcode.message);
    }

    function redirect(){
	    res.statusCode = 301;
        res.setHeader('Location', req.url + '/');
        res.end('Redirecting to ' + req.url + '/');
    }

	send(req, url.parse(req.url).pathname)
		.root("../src")
		.on('error', error)
		.on('directory', redirect)
		.pipe(res);
});

app.listen(7791);