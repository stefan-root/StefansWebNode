var http = require("http");
var dispatcher = require("./dispatcher")

http.createServer(function (request, response) {
    dispatcher.do(request, response)
}).listen(8080);