var mysql = require('mysql');

var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "testDB",
    port: 3306
})

dbConnection.connect((err)=>{
    if(err){console.log("Connecting Failed.");throw err;}
    console.log("Connecting Success.")
})

dbConnection.end()