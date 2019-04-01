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

console.log(dbConnection)
console.log("한번 끊어진 연결로 재연결은 불가.. 다시 만들어줘야함..")

dbConnection.connect((err)=>{
    if(error){console.log("Error"); throw err;}
})