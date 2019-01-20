const mysql = require( "mysql" );
const express = require( "express" );
const bodyParser = require( "body-parser" );
const ejs = require( "ejs" );
const mySQLConfig = require( "./config.js" );

const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.set( "view engine", "ejs" );

app.use( "/", require( "./routes/company.js" ) );

app.listen( process.env.PORT||8008, process.env.IP, () => { console.log( "on port ", process.env.PORT ); } );
