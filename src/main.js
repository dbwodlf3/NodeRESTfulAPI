//import libraries
const http = require('http')
const url = require('url')
const httpAttach = require('http-attach')


//declare servers
var server = http.createServer()
var DBServer = 0


//URL Filters
var pathFilter = /\/?(?:\?.*)?$/
var pathApiFilter = /\b\/api/i


//basic URL Routing
function URLRouting(req, res, next){
    let userPath = req.url.replace(pathFilter,'').toLowerCase()
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


//RESTful API Routing
function RESTfulAPIRouting(req, res, next){
    let userPath = req.url.replace(pathFilter,'').toLowerCase()

    if(pathApiFilter.test(userPath)){
        if(req.method == 'GET'){}
        else if(req.method == 'POST'){}
        else if(req.method == 'PUT'){}
        else if(req.method == 'DELETE'){}
        else { EndPoint() }
    } else { next() }

}


//API Function
function RESTfulGet(req, res)
{
    
}

function RESTfulPOST(req, res)
{

}

function RESTfulPUT(req, res)
{

}

function RESTfulDELETE(req, res)
{

}


//Attaching
httpAttach(server, EndPoint)
httpAttach(server, URLRouting)
httpAttach(server, RESTfulAPIRouting)

//Running
const port = 8000;
server.listen(port).on('listening', ()=>{console.log(`Server Started at port ${port}`)})
server.add