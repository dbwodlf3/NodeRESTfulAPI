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
        try{
        res.writeHead(200,{"Content-Type":"application/json"})
        res.write(JSON.stringify(result[0]))
        res.end()
        }
        catch(err){
            err500(req, res)
        }
    })
}

function RESTfulPOST(req, res, url)
{
    try{
        let body = []
        req.on("data", (chunk)=>{
            body.push(chunk)
        }).on('end', ()=> {
            body = JSON.parse(Buffer.concat(body).toString("utf-8"))
            let sql = `INSERT INTO user(userName, password, email, create_date) VALUES(${body.userName}, password(${body.password}), ${body.email});`

            myQuery(sql, (result)=>{
                res.writeHead(200,{"Content-Type":"application/json"})
                res.write("Good.")
                res.end()
            })
        })
    }catch(err){
        err500(req,res)
    }
}

function RESTfulPUT(req, res, url)
{
    err500(req,res)
}

function RESTfulDELETE(req, res, url)
{
    err500(req,res)
}


//API Helper Function
function err500(req, res){
    res.writeHead(500)
    res.wrte("Interanl Server Error")
    res.end()
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
        if(err){console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ㅆㅃ");throw err}
        else{
            callback(result)
            DBServer.end()
        }
    })
}

function getParameter(url){
    return url.split("/")[3]
}


//API Helper Function
function err500(req, res){
    res.writeHead(500)
    res.write("Interanl Server Error")
    res.end()
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
        if(err){console.log("여기서 에러 발생."); throw err;}
        callback(result)
        DBServer.end()
        return result
    })
}


//Attaching
httpAttach(server, EndPoint)
httpAttach(server, URLRouting)
httpAttach(server, RESTfulAPIRouting)

//Running
const port = 8000;
server.listen(port).on('listening', ()=>{console.log(`Server Started at port ${port}`)})