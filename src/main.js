//import libraries
var mysql = require('mysql');
const http = require('http')
const url = require('url')
const httpAttach = require('http-attach')


//declare servers
var server = http.createServer()

//URL Filters
var pathFilter = /\/?(?:\?.*)?$/
var pathApiFilter = /^\/api/i


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
        if(req.method == 'GET'){RESTfulGET(req, res, userPath)}
        else if(req.method == 'POST'){RESTfulPOST(req, res, userPath)}
        else if(req.method == 'PUT'){RESTfulPUT(req, res, userPath)}
        else if(req.method == 'DELETE'){RESTfulDELETE(req, res, userPath)}
    } else( next() )
}


//API Function
function RESTfulGET(req, res, userPath)
{   
    let parameter = getParameter(userPath)
    myQuery(`SELECT * FROM user where username=\'${parameter}\'`, (result)=>
    {
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write(JSON.stringify(result[0]))
        res.end();
    })
}

function RESTfulPOST(req, res, url)
{
    let parameter = getParameter(userPath)
    let sql = `SELECT * FROM user where username=\'${parameter}\'`
    myQuery( sql , (result)=>
    {
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write(JSON.stringify(result[0]))
        res.end();
    })
}

function RESTfulPUT(req, res, url)
{
    let parameter = getParameter(userPath)
    myQuery(`SELECT * FROM user where username=\'${parameter}\'`, (result)=>
    {
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write(JSON.stringify(result[0]))
        res.end();
    })
}

function RESTfulDELETE(req, res, url)
{
    let parameter = getParameter(userPath)
    myQuery(`SELECT * FROM user where username=\'${parameter}\'`, (result)=>
    {
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write(JSON.stringify(result[0]))
        res.end();
    })
}


//API Helper Function
function err500(req, res){
    res.writeHead(500)
    res.wrte("Interanl Server Error")
}

function myQuery(sql, callback){
    let DBServer = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "user",
        database: "testDB",
        port: 3306
    })

    DBServer.connect((err)=>{
        if(err) throw err;
    })

    DBServer.query(sql, (err, result)=>{
        if(err){throw err}
        else{
            callback(result)
            DBServer.end()
        }
    })
}

function getParameter(url){
    return url.split("/")[3]
}


//Attaching
httpAttach(server, EndPoint)
httpAttach(server, URLRouting)
httpAttach(server, RESTfulAPIRouting)

//Running
const port = 8000;
server.listen(port).on('listening', ()=>{console.log(`Server Started at port ${port}`)})