const mysql = require( "mysql" );
const express = require( "express" );

const knex = require( "../knex.js" );

const router = express.Router();

router.get( "/company/new", ( req, res ) => {
    // code to render newCompany form
    res.render( "newCompany.ejs" );
} );

router.post( "/company/new", ( req, res ) => {
    const data = req.body;

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
            res.setHeader( "Content-Type", "application/json" );
            res.send( { data: id } );
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
            res.render( "listCompany.ejs", { row: row[ 0 ] } );
        } )
        .catch( ( error ) => {
            console.log( error );
            res.send();
        } );
} );

router.get( "/company/:id/edit", ( req, res ) => {
    knex( "company_master" )
        .where( { id: req.params.id } )
        .then( ( row ) => {
            if ( row[ 0 ] ) {
                res.render( "editCompany.ejs", { row: row[ 0 ] } );
            } else {
                res.send( 404, `no record for id:${ req.params.id }` );
            }
        } )
        .catch( ( error ) => {
            console.log( error );
            res.send();
        } );
} );

router.delete( "/company/:id/edit", ( req, res ) => {
    console.log( "dlelte " );
    knex( "company_master" )
        .where( { id: req.params.id } )
        .del()
        .then(
            () => {
                res.setHeader( "Content-Type", "application/json" );
                res.redirect( 301, "newCompany.ejs" );
            },
        )
        .catch( ( error ) => {
            console.log( error );
        } );
} );

router.put( "/company/:id/edit", ( req, res ) => {
    knex( "company_master" )
        .where( { id: req.params.id } )
        .update( req.body )
        .then( () => {
            res.setHeader( "Content-Type", "application/json" );
            res.redirect( 301, `/company/${ req.params.id }` );
        } )
        .catch( ( error ) => {
            console.log( error );
        } );
} );

router.get( "/company", ( req, res ) => {
    knex( "company_master" )
        .then( ( rows ) => {
            console.log(rows);
            res.render( "getCompany.ejs", { rows } );
        } );
} );

module.exports = router;
