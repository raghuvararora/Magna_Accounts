var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        //socketPath: 'mysql-socket-path',
        password : 'password',
        socketPath: '/var/run/mysqld/mysqld.sock',
        database: 'magnaaccounts'
    }
  });

// let pg=knex('company_master').insert({name:'kjkjjk',
// address:'adr231',
// email:'gmial',
// contact:'324234',
// gst:'2334ik4k'}).returning('*').toString();

// console.log(pg);
// // console.log(knex.select().from("company_master"));

module.exports=knex;

