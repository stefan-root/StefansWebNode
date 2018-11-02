var fs = require("fs");
var urls = require("./urlMapping.json")

function lookupURL(req) {
    if (urls.hasOwnProperty(req.url)) {
        return("content/" + urls[req.url]);
    } else {
        return "404";
    }
}

function showWebsite(err, data, res) {
    if (err) {
        fs.readFile("./content/404.html", function(err, data) {
            if (err) {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.write("404");
                res.end();                
            }
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    }
}

exports.getWebsite = function(req, res) {
    fs.readFile(lookupURL(req), function(err, data) {
        showWebsite(err, data, res);
    });
}