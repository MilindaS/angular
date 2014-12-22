myApp.factory('Session', function($q, $rootScope) {


    var get = function(key) {
        var defer = $q.defer();
        defer.resolve(sessionStorage.getItem(key));
        return defer.promise;
    }

    var put = function(key, val) {
        var defer = $q.defer();
        defer.resolve(sessionStorage.setItem(key, val));
        return defer.promise;
    }

    return {
        get: get,
        put: put
    }



});