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
    myQuery(`SELECT * FROM user where username=\'${parameter}\'`, (err, result)=>
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

        let body = []
        req.on("data", (chunk)=>{body.push(chunk)}).on('end', ()=> {
            try{body = JSON.parse(Buffer.concat(body).toString("utf-8"))}catch{}
            let sql = `INSERT INTO user(userName, password, email, create_date) VALUES(\"${body.userName}\", password(\"${body.password}\"), \"${body.email}\", current_date);`

            myQuery(sql, (err, result)=>{
                if(err){err500(req,res);}
                else{
                res.writeHead(200,{"Content-Type":"application/json"})
                res.write("Good.")
                res.end()
                }
            })
            
        })

}

function RESTfulPUT(req, res, url)
{
    let body = []
    req.on("data", (chunk)=>{ body.push(chunk)}).on('end', ()=>{
        try{body = JSON.parse(Buffer.concat(body).toString("utf-8"))}catch{}
        sql = `temp`;
        myQuery(sql, (err, result)=>{
            if(err){err500(req,res);}
            else{

            }
        })
    })
}

function RESTfulDELETE(req, res, url)
{
    err500(req,res)
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
            if(err){callback(err, result)}
            else{
                callback(err, result)
            }
            DBServer.end()
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