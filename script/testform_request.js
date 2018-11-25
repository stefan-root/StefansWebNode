var qs = require("querystring");

exports.run = function(request, response) {
    var body = [];
    request.on('data', function(chunk)  {
        body.push(chunk);
    }).on('end', function() {
        body = Buffer.concat(body).toString();
        var post = qs.parse(body);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(post.name);
        response.end();
    });
}