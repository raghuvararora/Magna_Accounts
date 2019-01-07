let mysql      =require('mysql');
let express    =require("express");
let router     =express.Router();
let mySQLConfig=require("../config.js");


let connection = mysql.createConnection(mySQLConfig);

connection.connect((err)=> {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

connection.query("use magnaaccounts;", (error, result,fields)=>{
      console.log(result);
      if(error){
          console.log(error.code);
      }
  })


router.get("/company/new", (req, res)=>{
    //code to render newCompany form 
    console.log("yoy")
    res.render("newCompany.ejs");
    connection.query("show databases", (error, result, fields)=>{
        console.log(result);
    })
});
router.post("/company/new",(req, res)=>{
    console.log("right here sir", req.body);
    let data=req.body;
    console.log(data.name);
    connection.query("insert into company_master(name, address, email, contact, gst) values(?,?,?,?,?); ", [data.name, data.address,data.email,data.contact, data.gst] ,(error, result, fields)=>{
        if(error){
            console.log(error);
            //error 500
        }
        // else if(loggedIn()){
        //     console.log("pass");
        //     //error 403 forbidden
        // }
        else{
            //response 201
            res.redirect(201, "/company/"+result.insertId)
        }
    } )
    
} );
router.get("/company/:id/edit", (req, res)=>{
    connection.query(" select * from company_master where id=?;",parseInt(req.params.id), (error, result, fields)=>{
        if(error){
            //render /comapny/new template with  existing data
            console.log("error in  retrieving",error);
        }
        else{
            res.render("editCompany.ejs", result[0] );
        }
    } )
});
router.put("/company/:id/edit", (req, res)=>{
    connection.query("update company_master set ? where id=? ", [req.body, req.params.id], (error, result, fields)=>{
        if(error){
            console.log("try again later");
        }
    })
});

module.exports=router;