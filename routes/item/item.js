/* eslint-disable complexity */
const express = require( "express" );
const knex = require( "../../knex.js" );
const sanitizer = require( "../../modules/sanitizer" );

const router = express.Router();
const args = "item";
console.log( sanitizer.sanitizeNumber( "19" ) );

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
    console.log( "here", req.body );
    const inpdata={
        name: data.name,
        categoryid: (sanitizer.sanitizeNumber( data.categoryid )),
        itemcode: sanitizer.sanitizeNumber( data.itemcode ),
        hsncode: data.hsncode,
        sellingprice: sanitizer.sanitizeNumber( data.sellingprice ),
        cgst: sanitizer.sanitizeNumber( data.cgst ),
        sgst: sanitizer.sanitizeNumber( data.sgst ),
        description: data.description,
        discount_applicable: sanitizer.sanitizeNumber( data.discount_applicable ),
        companyid: sanitizer.sanitizeNumber( data.companyid ),
    };
    console.log( "here2" );
    console.log( inpdata );
    knex( `${ args }_master` )
        .where( { id: req.params.id } )
        .update( inpdata )
        .then( () => {
            console.log( "dsfsdfsdfsdsdfdsfdsf", inpdata );
            res.setHeader( "Content-Type", "application/json" );
            res.redirect( 200, `/${ args`/${ req.params.id }` }` );
        } )
        .catch( ( error ) => {
            console.log( "kljkljkjlkkjljk", data.categoryid, inpdata );
            console.log( "dfsdfsfsfsfsdffffffffffffffff", error );
            throw new Error( "SERVICE_UNAVAILABLE" );
        } );
    console( "here2" );
} );

module.exports = router;
