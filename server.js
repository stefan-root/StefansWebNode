var http = require("http");
var dispatcher = require("./dispatcher")

http.createServer(onRequest).listen(8080);

function onRequest(request, response) {
    dispatcher.do(request, response)
}