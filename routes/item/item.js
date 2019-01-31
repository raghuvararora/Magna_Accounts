/* eslint-disable complexity */
const express = require( "express" );
const knex = require( "../../knex.js" );
const sanitizer=require("../../modules/sanitizer.js")

const router = express.Router();
const args = "item";

router.post( "/item/new", ( req, res ) => {
    const data = req.body;
    console.log( req.body );

    knex( "item_master" )
        .insert( {
            name: data.name,
            categoryid: data.categoryid || null,
            itemcode: data.itemcode || null,
            hsncode: data.hsncode,
            sellingprice: data.sellingprice || null,
            cgst: data.cgst || null,
            sgst: data.sgst || null,
            description: data.description,
            discount_applicable: data.discountapplicable || null,
            companyid: data.companyid || null,
        } )
        .returning( "id" )
        .then( ( id ) => {
            res.setHeader( "Content-Type", "application/json" );
            res.send( { data: id } );
        } )
        .catch( ( error ) => {
            console.log( "errorkjjlkjljlkljlkjkljkjk", error.code );
            // if company doesnt exists
            // else other error
        } );
} );

router.put( `/${ args }/:id/edit`, ( req, res ) => {
    const data = req.body;
    const inpdata = {
        name: data.name,
        categoryid: sanitizer.sanitizeNumber( data.categoryid ),
        itemcode: data.itemcode || null,
        hsncode: data.hsncode,
        sellingprice: data.sellingprice || null,
        cgst: data.cgst || null,
        sgst: data.sgst || null,
        description: data.description,
        discount_applicable: data.discount_applicable || null,
        companyid: data.companyid || null,
    };
    knex( `${ args }_master` )
        .where( { id: req.params.id } )
        .update( inpdata )
        .then( () => {
            console.log( req.body );
            res.setHeader( "Content-Type", "application/json" );
            res.redirect( 301, `/${ args`/${ req.params.id }` }` );
        } )
        .catch( ( error ) => {
            console.log( "kljkljkjlkkjljk", data.categoryid, inpdata );
            console.log( "dfsdfsfsfsfsdffffffffffffffff", error );
            throw new Error( "SERVICE_UNAVAILABLE" );
        } );
} );

module.exports = router;
