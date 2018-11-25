var fs = require("fs");
var urls = require("./urlMapping.json");
var validation = require("./validation");

exports.do = function(request, response) {
    var action = lookupURL(request.url);
    if(validation.validateRequest(request)) {
        onValidationSuccess(action, request, response);
    }
}

function onValidationSuccess(action, request, response) {
    switch(action.type) {
        case "html": showWebsite(action.path, response); break;
        case "js": runScript(request, response, action.path); break;
        case "static": deliverFile(action, response); break;
    }
}

function runScript(request, response, path) {
    var script = require(path);
    script.run(request, response);
}

function showWebsite(path, response) {
    fs.readFile(path, function(err, data) {
        parseWebsite(err, data, response);
    });
}

function lookupURL(url) {
    if (urls.hasOwnProperty(url)) {
        return urls[url];
    } else {
        return({ "type": "html", "path": "content/404.html" });
    }
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

function deliverFile(action, response) {
    fs.readFile(action.path, function(err, data) {
        response.writeHead(200, {"Content-Type": action.content_type});
        response.write(data);
        response.end();
    });    
}