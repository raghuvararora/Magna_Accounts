module.exports={ 
    sanitizeNumber : function ( a ) {
    if ( a.trim() === "" ) {
        return null;
    }
    return Number( a );
}
}
