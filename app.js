const mysql = require( "mysql" );
const express = require( "express" );
const bodyParser = require( "body-parser" );
const ejs = require( "ejs" );
const mySQLConfig = require( "./config.js" );

const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.set( "view engine", "ejs" );

function call( a, b ) {
    for ( let items in b ) {
        console.log( b[items] );
        let router=require( "./routes/master.js" )(b[items]);
        a.use( "/", router  );
    }
}

// app.use( "/", require( "./routes/company.js" ) );
call( app, ["company"] );
app.use("/", require("./routes/company/company.js"));

app.listen( process.env.PORT || 8008, process.env.IP, () => { console.log( "on port ", process.env.PORT ); } );
