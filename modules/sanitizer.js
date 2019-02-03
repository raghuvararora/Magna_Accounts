module.exports={ 
    sanitizeNumber : function ( a ) {
    if ( a.trim() === "" || a==undefined ) {
        return null;
    }
    return Number( a );
}
}
