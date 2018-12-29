var mysql      = require('mysql');
var express    =require("express");
var bodyParser =require('body-parser');



var app = express();
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    //socketPath: 'mysql-socket-path',
    password : 'password',
    socketPath: '/var/run/mysqld/mysqld.sock'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connection.connect((err)=> {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
//   });

app.get("/company/new", (req, res)=>{
    res.send("");
});
app.post("/company/new",(req, res)=>{
    connection.query("insert into company_master set ? ",  req.body,(error, result, fields)=>{
        if(error){
            console.log("try again")
        }
    } )
    
} );
app.get("/company/:id/edit", (req, res)=>{
    connection.query("select * from company_master where id=?",req.params.id, (error, result, fields)=>{
        if(error){
            //render /comapny/new template with  existing data
            console.log("error in  retrieving");
        }
    } )
});
app.put("/company/:id/edit", (req, res)=>{
    connection.query("update company_master set ? where id=? ", [req.body, req.params.id], (error, result, fields)=>{
        if(error){
            console.log("try again later");
        }
    })
});
app.post("/item/new")
app.put("/item/:id")


connection.query("show databases;", (error, result,fields)=>{
      console.log(result[1].Database);
  })

connection.end();

app.listen(8080, "localhost",()=>{console.log("hello");})
