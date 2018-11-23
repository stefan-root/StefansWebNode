var fs = require("fs");
var urls = require("./urlMapping.json")

exports.do = function(request, response) {
    var action = lookupURL(request.url);
    switch(action.type) {
        case "html": showWebsite(action.path, response);
        case "js": return("500");
    }
}

function lookupURL(url) {
    if (urls.hasOwnProperty(url)) {
        return urls[url];
    } else {
        return({ "type": "html", "path": "content/404.html" });
    }
}

function showWebsite(path, response) {
    fs.readFile(path, function(err, data) {
        parseWebsite(err, data, response);
    });
}

function parseWebsite(err, data, response) {
    if (err) {
        fs.readFile("./content/404.html", function(err, data) {
            if (err) {
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("404");
                response.end();                
            }
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        });
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(data);
        response.end();
    }
}