const mysql = require( "mysql" );
const express = require( "express" );
const bodyParser = require( "body-parser" );
const ejs = require( "ejs" );

const app = express();

const mongoose = require( "mongoose" );
const passport = require( "passport" );
const LocalStrategy = require( "passport-local" ).Strategy;
const sessions = require( "express-session" );
const mySQLConfig = require( "./config.js" );
const Admin = require( "./models/admin.js" );

mongoose.connect( "mongodb://raghuvar:qwert123@ds243418.mlab.com:43418/sample" );

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.set( "view engine", "ejs" );

//  -------PASSPORT CONFIGURATION-------//

app.use( sessions( {
    secret: "a random sentece",
    resave: false,
    saveUninitialized: false,
} ) );

app.use( passport.initialize() );
app.use( passport.session() );
passport.use( new LocalStrategy( Admin.authenticate() ) );
passport.serializeUser( Admin.serializeUser() );
passport.deserializeUser( Admin.deserializeUser() );

//------------------------

function isLoggedIn( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    }

    res.redirect( "/adminlogin" );
}

function call( a, b ) {
    for ( const items in b ) {
        console.log( b[ items ] );
        const router = require( "./routes/master.js" )( b[ items ] );
        a.use( "/", router );
    }
}

// app.use( "/", require( "./routes/company.js" ) );

//  -----login routes-----
app.get("/adminlogin", function(req, res){
	res.render("login");
})

app.post("/adminlogin", passport.authenticate("local", 
		{
			successRedirect:"/events/new",
			failureRedirect:"/adminlogin" 
		}),
		function(req,res){
			console.log(req.user, "hey");
})

//  ---------------------
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
    if ( err.message === "NO_DATA" ) {
        res.render( "error/error.ejs", { error: "No Record found" } );
    }
    if ( err.message === "SERVICE_UNAVAILABLE" ) {
        res.status( 500 ).render( "error/error.ejs", { error: "500:Service Unavailable" } );
    }
} );

app.listen( process.env.PORT || 8008, process.env.IP, () => { console.log( "on port ", process.env.PORT ); } );
