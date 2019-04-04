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
    err404(req, res)
}


//RESTful API Routing
function RESTfulAPIRouting(req, res, next){
    let userPath = req.url.replace(pathFilter,'').toLowerCase()
    
    if(pathApiFilter.test(userPath)){
        switch(req.method){
            case "GET":RESTfulGET(req, res, userPath);break;
            case "POST":RESTfulPOST(req, res, userPath);break;
            case "PUT":RESTfulPUT(req, res, userPath);break;
            case "DELETE":RESTfulDELETE(req, res, userPath);break;
        }
    } else(next())
}


//API Function
function RESTfulGET(req, res, url)
{   
    let parameter = getParameter(url, 3)
    let sql = `SELECT * FROM user where username=\'${parameter}\'`
    myQuery(sql, (err, result)=>
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
        let parameter = getParameter(url, 2)
        req.on("data", (chunk)=>{body.push(chunk)}).on('end', ()=> {
            try{body = JSON.parse(Buffer.concat(body).toString("utf-8"))}catch{}
            let sql = `INSERT INTO ${parameter}(userName, password, email, create_date) VALUES(\"${body.userName}\", password(\"${body.password}\"), \"${body.email}\", current_date);`

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
    let parameter = [getParameter(url, 2), getParameter(url, 3)]
    console.log(parameter)
    let sql = `DELETE from ${parameter[0]} where userName = "${parameter[1]}"`
    myQuery(sql, (err, result)=>{
        if(err)err500(req,res);
        else{
            res.writeHead(200, {"Content-Type":"application/json"})
            res.write("Deleted")
            res.end()
        }
    })
}


//API Helper Function
function err500(req, res){
    res.writeHead(500)
    res.write("Interanl Server Error")
    res.end()
}
function err404(req, res){
    res.writeHead(404)
    res.write("<h1>Not Found a Page</h1>")
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

function getParameter(url, n){
    return url.split("/")[n]
}


//Attaching
httpAttach(server, EndPoint)
httpAttach(server, URLRouting)
httpAttach(server, RESTfulAPIRouting)

//Running
const port = 8000;
server.listen(port).on('listening', ()=>{console.log(`Server Started at port ${port}`)})