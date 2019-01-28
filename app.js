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
    for ( const items in b ) {
        console.log( b[ items ] );
        const router = require( "./routes/master.js" )( b[ items ] );
        a.use( "/", router );
    }
}

// app.use( "/", require( "./routes/company.js" ) );
call( app, [ "company", "item" ] );
app.use( "/", require( "./routes/company/company.js" ) );
app.use( "/", require( "./routes/item/item.js" ) );

app.get( "*", ( req, res ) => {
    throw new Error( "BAD_REQUEST" );
} );

app.use( ( err, req, res, next ) => {
    if ( err.message === "BAD_REQUEST" ) {
        res.status( 400 ).render( "error/error.ejs", { error: "BAD_REQUEST" } );
    }
    if ( err.message === "NO DATA" ) {
        res.render( "error/error.ejs", { error: "No Record found" } );
    }
    if ( err.message === "SERVICE_UNAVAILABLE" ) {
        res.status( 500 ).render( "error/error.ejs", { error: "500:Service Unavailable" } );
    }

} );

app.listen( process.env.PORT || 8008, process.env.IP, () => { console.log( "on port ", process.env.PORT ); } );
