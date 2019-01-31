// let knex = require( "knex" )( {
//     client: "mysql",
//     connection: {
//         host: "localhost",
//         user: "root",
//         // socketPath: 'mysql-socket-path',
//         password: "password",
//         socketPath: "/var/run/mysqld/mysqld.sock",
//         database: "magnaaccounts",
//     },
// } );

const knex = require( "knex" )( {
    client: "mysql",
    connection: {
        host: "85.10.205.173",
        user: "raghuvar",
        server: "127.0.0.1",
        port: 3306,
        password: "qwert123",
        // socketPath: "/var/run/mysqld/mysqld.sock",
        charset : 'utf8mb4',
        database: "magnaaccounts",
        debug: "verbose",
    },
} );

// knex( "item_master" )
//     .insert( {
//         name: "kjkjjk",
//         hsncode: "" || null,
        
//     } ).catch( error => ( console.log( error ) ) );

// console.log(knex.select().from("company_master"));

module.exports = knex;
