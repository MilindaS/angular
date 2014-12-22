myApp.factory('YDNDBService', function($q, $rootScope, $timeout, config) {



    var init = function() {
        var defer = $q.defer();

        var scope = {
            createDB: function(DB_NAME, schema) {
                $rootScope.ds = new ydn.db.Storage(DB_NAME, schema);
            },

            put: function(store, data, successCallback, errorCallback) {
                return $rootScope.ds.put(store, data);
            },
            get: function(store, id, successCallback, errorCallback) {
                return $rootScope.ds.get(store, id);
            },
            getAll: function(store, successCallback, errorCallback) {
                var def = $q.defer();
                $rootScope.ds.values('product').done(function(data) {
                    def.resolve(data);
                });
                return def.promise;
            },
            remove: function(store, id, successCallback, errorCallback) {
                return $rootScope.ds.remove(store, id);
            }
        }

        defer.resolve(scope);


        return defer.promise;

    }




    return {
        init: init
    }
});