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
    let parameter = userPath.split("/")[3]
    myQuery(`SELECT * FROM user where username=\'${parameter}\'`, (result)=>
    {
        try{
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write(JSON.stringify(result[0]))
        }
        catch(err){
            res.write("Query를 했는데, 그 결과의 내용물이 JSON이 아니었기에, JSON 텍스트화 함수를 사용하여 오류가 발생했습니다.")
        }
        res.end();
    })
}

function RESTfulPOST(req, res, url)
{

}

function RESTfulPUT(req, res, url)
{

}

function RESTfulDELETE(req, res, url)
{

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

    let result2 = DBServer.query(sql, (err, result)=>{
        if(err){throw err; return 1};
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