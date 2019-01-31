function sanitizeNumber( a ) {
    if ( a.trim() === "" ) {
        return null;
    }

    return Number( a );
}

module.export = {
    sanitizeNumber,
};
