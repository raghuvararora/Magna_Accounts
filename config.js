let mySQLConfig={
    host     : 'localhost',
    user     : 'root',
    //socketPath: 'mysql-socket-path',
    password : 'password',
    socketPath: '/var/run/mysqld/mysqld.sock'
};

module.exports=mySQLConfig;