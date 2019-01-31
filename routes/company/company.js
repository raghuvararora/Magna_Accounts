const knex = require( "../../knex.js" );
const express=require("express");
const router = express.Router();
const args ="company";

router.post( "/company/new", ( req, res ) => {
    const data = req.body;
    console.log(req.body);

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

router.put( `/${ args }/:id/edit`, ( req, res ) => {
    knex( `${ args }_master` )
        .where( { id: req.params.id } )
        .update( req.body )
        .then( () => {
            console.log(req.body);
            res.setHeader( "Content-Type", "application/json" );
            res.redirect( 301, `/${ args`/${ req.params.id }` }` );
        } )
        .catch( ( error ) => {
            console.log("kljkljkjlkkjl",req.body);
            console.log("dfsdfsfsfsfsdffffffffffffffff",error);
            throw new Error("SERVICE_UNAVAILABLE");
        } );
} );

module.exports=router;
