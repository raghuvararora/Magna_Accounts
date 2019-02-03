module.exports = {
    sanitizeNumber: ( a ) => {
        if ( a.trim() === "" || a === undefined ) {
            return null;
        }
        return Number( a );
    },
};
