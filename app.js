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


app.use("/", require("./routes/company.js"));

app.listen(8008,()=>{console.log("hello");})
