angular.module('nics.Config', []).
value('config', {
    schema: {
        product: {
            key: {
                keyPath: 'id'
            }
        }
    },
    dbname: 'nics',
    dbversion: 37,
    apipath: 'http://api.nics.loc/api_v1',
    syncdelay: 5000,
    DO_SYNC: false,
    DO_SETUP: false,
    DEBUG: false
});