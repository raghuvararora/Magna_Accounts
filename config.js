let mySQLConfig={
    host     : 'localhost',
    user     : 'root',
    //socketPath: 'mysql-socket-path',
    password : 'password',
    socketPath: '/var/run/mysqld/mysqld.sock'
    //port:8080
};

module.exports=mySQLConfig;
