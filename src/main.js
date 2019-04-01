const http = require('http')
const url = require('url')
const httpAttach = require('http-attach')

var server = http.createServer()
var pathFilter = /\/?(?:\?.*)?$/
var DBServer = 0

function RESTfulAPIRouting(req, res, next){
    userPath = req.url.replace(pathFilter,'').toLowerCase()

    switch(userPath){
    }

    next()
}

function URLRouting(req, res, next){
    userPath = req.url.replace(pathFilter,'').toLowerCase()
    res.writeHead(200, {'Content-Type' : 'text/html'})
    

    switch(userPath){
        case ''    : res.write("<h1>RESTfulAPI  Home</h1>"); res.end(); break;
        default     : next(); break;
    }
}

function EndPoint(req, res, next){
    res.writeHead(404)
    res.write("<h1>Not Found a Page</h1>")
    res.end()
}

//Attaching
httpAttach(server, EndPoint)
httpAttach(server, URLRouting)

//Running

server.listen(8000)