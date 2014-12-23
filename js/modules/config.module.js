angular.module('Config', []).value('config', {
    apipath: 'http://mydev.loc/api_v1',
    DB_NAME: 'system',
    DO_SYNC: true
});