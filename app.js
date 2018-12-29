var mysql      = require('mysql');
var express    =require("express");

var app = express();
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    //socketPath: 'mysql-socket-path',
    password : 'password',
    socketPath: '/var/run/mysqld/mysqld.sock'
});

// connection.connect((err)=> {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
//   });


app.post("/")

connection.query("show databases;", (error, result,fields)=>{
      console.log(result[1].Database);
  })

connection.end();

app.listen(8080, "localhost",()=>{console.log("hello");})
