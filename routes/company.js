const mysql = require( "mysql" );
const express = require( "express" );

const mySQLConfig = require( "../config.js" );
const knex = require( "../knex.js" );

const router = express.Router();

const connection = mysql.createConnection( mySQLConfig );

router.get( "/company/new", ( req, res ) => {
    // code to render newCompany form
    console.log( "yoy" );
    res.render( "newCompany.ejs" );
    connection.query( "show databases", ( error, result, fields ) => {
        console.log( result );
    } );
} );
router.post( "/company/new", ( req, res ) => {
    console.log( "right here sir", req.body );
    const data = req.body;
    console.log( data.name );

    knex( "company_master" )
        .insert( {
            name: data.name,
            address: data.address,
            email: data.email,
            contact: data.contact,
            gst: data.gst,
        } )
        .returning( "id" )
        .then( ( id ) => {
            console.log( id, "right here" );
            res.redirect( 201, "/company/" + id );
        } )
        .catch( ( error ) => {
            console.log( "error inserting", error );
        } );
    // connection.query("insert into company_master(name, address, email, contact, gst) values(?,?,?,?,?); ", [data.name, data.address,data.email,data.contact, data.gst] ,(error, result, fields)=>{
    //     if(error){
    //         console.log(error);
    //         //error 500
    //     }
    //     // else if(loggedIn()){
    //     //     console.log("pass");
    //     //     //error 403 forbidden
    //     // }
    //     else{
    //         //response 201
    //         res.redirect(201, "/company/"+result.insertId)
    //     }
    // } )
} );

router.get( "/company/:id", ( req, res ) => {
    knex( "company_master" )
        .where( { id: req.params.id } )
        .then( ( row ) => {
            console.log( row );
            res.render( "listCompany.ejs", { row: row[ 0 ] } );
        } )
        .catch( ( error ) => {
            console.log( error );
            res.send();
        } );
} );

router.get( "/company/:id/edit", ( req, res ) => {
    connection.query( " select * from company_master where id=?;", parseInt( req.params.id ), ( error, result, fields ) => {
        if ( error ) {
            // render /comapny/new template with  existing data
            console.log( "error in  retrieving", error );
        } else {
            res.render( "editCompany.ejs", result[ 0 ] );
        }
    } );
} );
router.put( "/company/:id/edit", ( req, res ) => {
    connection.query( "update company_master set ? where id=? ", [ req.body, req.params.id ], ( error, result, fields ) => {
        if ( error ) {
            console.log( "try again later" );
        }
    } );
} );

router.get( "/company", ( req, res ) => {
    knex( "company_master" )
        .then( ( rows ) => {
            console.log( "right here,", rows[ 0 ] );
            res.render( "getCompany.ejs", { rows } );
        } );
} );

module.exports = router;
