var http = require("http");
var cp = require("./contentProvider")

http.createServer(function (req, res) {
    cp.getWebsite(req, res);
}).listen(8080);