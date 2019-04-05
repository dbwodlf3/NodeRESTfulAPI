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
    let parameter = [getParameter(url, 2),getParameter(url, 3)]
    let sqlJson = {"table":parameter[0],"condition":parameter[0]+"Name","conditionValue":parameter[1],"conditionOperation":"="}
    let sql = createSQL("SELECT", sqlJson)
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
            body["table"] = parameter
            let sql = createSQL("INSERT", body)
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
    let parameter = [getParameter(url, 2), getParameter(url, 3)]
    req.on("data", (chunk)=>{body.push(chunk)}).on('end', ()=> {
        try{body = JSON.parse(Buffer.concat(body).toString("utf-8"))}catch(err){console.log(err);}

        body["table"] = parameter[0]
        body["condition"] = (parameter[0]+"Name")
        body["conditionValue"] = parameter[1]
        let sql = createSQL("UPDATE", body)

        myQuery(sql, (err, result)=>{
            if(err){err500(req,res); console.log(err);}
            else{
                res.writeHead(200, {"Content-Type":"text/plain"})
                res.write("Updated.")
                res.end()
            }
        })

    })
}

function RESTfulDELETE(req, res, url)
{
    let parameter = [getParameter(url, 2), getParameter(url, 3)]
    let sqlJson = {"table":parameter[0], "condition":(parameter[0]+"Name"), "conditionValue":parameter[1]}
    let sql = createSQL("DELETE", sqlJson)
    console.log(sql)
    myQuery(sql, (err, result)=>{
        if(err)err500(req,res);
        else{
            res.writeHead(200, {"Content-Type":"text/plain"})
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


function createSQL(command, reqBody){
    let result = ""

    switch(command){
        case "INSERT": result = "INSERT INTO " + reqBody["table"] + forEachSQL(reqBody["attributes"]) + " VALUES" + forEachSQL(reqBody["data"],true)
        break;
        case "SELECT": result = "SELECT * from "  + reqBody["table"] + " WHERE "  + reqBody["condition"] + reqBody["conditionOperation"] + wrapperValue(reqBody["conditionValue"])
        break;
        case "UPDATE": result = "UPDATE " + reqBody["table"] + " SET " + forEachSQL2(reqBody["attributes"], reqBody["data"]) + " WHERE " + reqBody["condition"] + "= " + wrapperValue(reqBody["conditionValue"])
        break;
        case "DELETE": result = "DELETE FROM " +  reqBody["table"] + " WHERE " + reqBody["condition"] +"= " + wrapperValue(reqBody["conditionValue"])
        break;
        default: break;
    }
    return result
}

function forEachSQL(data, option=false){
    let temp = "("
    if(option){
        try{data.forEach((e)=>{temp = temp+ wrapperValue(e) +", ";})}catch{return}
    }
    else{
        try{data.forEach((e)=>{temp = temp + e +", ";})}catch{return}
    }
    temp = temp.slice(0, -2)
    temp = temp + ") "
    return temp;
}

function forEachSQL2(data1, data2){
    let temp = ""

    for(let i=0;i<data1.length;i++){
            temp = temp + data1[i] + "= " + wrapperValue(data2[i]) + ", "
    }

    temp = temp.slice(0, -2)
    temp = temp + ""
    return temp;
}

function wrapperValue(data){
    return `"${data}"`
}


//Attaching
httpAttach(server, EndPoint)
httpAttach(server, URLRouting)
httpAttach(server, RESTfulAPIRouting)

//Running
const port = 8000;
server.listen(port).on('listening', ()=>{console.log(`Server Started at port ${port}`)})