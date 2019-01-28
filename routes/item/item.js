const express=require("express");
const knex = require( "../../knex.js" );
const router = express.Router();

router.post( "/item/new", ( req, res ) => {
    const data = req.body;
    console.log( req.body );

    knex( "item_master" )
        .insert( {
            name: data.name,
            categoryid: data.categoryid,
            itemcode: data.itemcode,
            hsncode: data.hsncode,
            sellingprice: data.sellingprice,
            cgst: data.cgst,
            sgst: data.sgst,
            description: data.description,
            discount_applicable: data.discountapplicable,
            companyid: data.companyid,
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

module.exports = router;
