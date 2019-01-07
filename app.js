let mysql      =require('mysql');
let express    =require("express");
let bodyParser =require('body-parser');
let ejs        =require("ejs");
let mySQLConfig=require("./config.js");


let app = express();
let connection = mysql.createConnection(mySQLConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// connection.connect((err)=> {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('connected as id ' + connection.threadId);
//   });

// app.get("/company/new", (req, res)=>{
//     //code to render newCompany form 
//     console.log("yoy")
//     res.render("newCompany.ejs");
// });
// app.post("/company/new",(req, res)=>{
//     connection.query("insert into company_master set ? ",  req.body,(error, result, fields)=>{
//         if(error.fatal){
//             //error 500
//         }
//         else if(loggedIn()){
//             console.log("pass");
//             //error 403 forbidden
//         }
//         else{
//             //response 201
//             res.redirect(201, "/company/"+result.insertId)
//         }
//     } )
    
// } );
// app.get("/company/:id/edit", (req, res)=>{
//     connection.query("select * from company_master where id=?",req.params.id, (error, result, fields)=>{
//         if(error){
//             //render /comapny/new template with  existing data
//             console.log("error in  retrieving");
//         }
//         else{
//             res.render("editCompany.ejs", result[0] );
//         }
//     } )
// });
// app.put("/company/:id/edit", (req, res)=>{
//     connection.query("update company_master set ? where id=? ", [req.body, req.params.id], (error, result, fields)=>{
//         if(error){
//             console.log("try again later");
//         }
//     })
// });

app.use("/", require("./routes/company.js"));
app.post("/item/new")
app.put("/item/:id")


// connection.query("show databases;", (error, result,fields)=>{
//       console.log(result);
//       if(error){
//           console.log(error.code);
//       }
//   })

// connection.query("select host, db, user from db where db like 'sys' ;  ", (error, result,fields)=>{
//     console.log(result);
// })


connection.end();

app.listen(8008,()=>{console.log("hello");})
