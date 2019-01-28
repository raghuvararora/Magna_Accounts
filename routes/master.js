const mysql = require( "mysql" );
const express = require( "express" );

const knex = require( "../knex.js" );

const router = express.Router();

module.exports = ( args ) => {
    router.get( `/${ args }/new`, ( req, res ) => {
    // code to render newCompany form
        res.render( `${args}/`+`new${ args }.ejs` );
    } );

    router.get( `/${args}/:id`, ( req, res ) => {
        knex( `${args}_master` )
            .where( { id: req.params.id } )
            .then( ( row ) => {
                if(row[0]){
                    res.render( "listMaster.ejs", { row: row[ 0 ] } );
                }
                else {
                    throw new Error("NO_DATA");
                }
            } )
            .catch( ( error ) => {
                throw new Error("SERVICE_UNAVAILABLE");
            } );
    } );

    router.get( `/${args}/:id/edit`, ( req, res ) => {
        knex( `${args}_master` )
            .where( { id: req.params.id } )
            .then( ( row ) => {
                if ( row[ 0 ] ) {
                    res.render( `${args}/edit${args}.ejs`, { row: row[ 0 ] } );
                } else {
                    //res.send( 404, `no record for id:${ req.params.id }` );
                    throw new Error("NO_DATA");
                }
            } )
            .catch( ( error ) => {
                throw new Error("SERVICE_UNAVAILABLE");
            } );
    } );

    router.delete( `/${args}/:id/edit`, ( req, res ) => {
        console.log( "dlelte " );
        knex( `${args}_master` )
            .where( { id: req.params.id } )
            .del()
            .then(
                () => {
                    res.setHeader( "Content-Type", "application/json" );
                    res.redirect( 301, `${args}/new${args}.ejs` );
                },
            )
            .catch( ( error ) => {
                console.log( error );
            } );
    } );

    router.put( `/${ args }/:id/edit`, ( req, res ) => {
        knex( `${ args }_master` )
            .where( { id: req.params.id } )
            .update( req.body )
            .then( () => {
                res.setHeader( "Content-Type", "application/json" );
                res.redirect( 301, `/${ args`/${ req.params.id }` }` );
            } )
            .catch( ( error ) => {
                throw new Error("SERVICE_UNAVAILABLE");
            } );
    } );

    router.get( `/${ args }`, ( req, res ) => {
        knex( `${ args }_master` )
            .then( ( rows ) => {
                res.render( "getMaster.ejs", { rows, props: Object.getOwnPropertyNames( rows[ 0 ] ) } );
            } );
    } );

    return router;
};
