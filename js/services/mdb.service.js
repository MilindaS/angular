myApp.factory('MDBService', function($q, $rootScope, $timeout, config, CipherBoom) {
    var init = function(storeName, callback) {

        var deferred = $q.defer();

        var scope = {
                getQueryObject: function(successCallback, errorCallback) {
                    return $rootScope.idbstore[storeName];
                },
                get: function(key, successCallback, errorCallback) {
                    $rootScope.idbstore.get(storeName, key).then(function(obj) {
                        //var decrypted = CipherBoom().getDecryptedObject(obj);
                        successCallback(obj);
                    }, errorCallback);
                },
                find: function(match, successCallback, errorCallback) {
                    $rootScope.idbstore.getAll(storeName).then(function(list) {
                        var decrypted = [];
                        for (i in list) {
                            $timeout(function() {
                                decrypted.push(CipherBoom().getDecryptedObject(list[i]));
                            }, 100);
                        }
                        successCallback(_.where(decrypted, match));
                    }, errorCallback);
                },
                getAll: function(successCallback, errorCallback) {
                    //console.log($rootScope.idbstore[storeName].query().all().execute());
                    //return false;
                    $rootScope.idbstore[storeName].query().all().execute().then(function(list) {
                        successCallback(list);
                    }, errorCallback);
                },
                remove: function(id, successCallback, errorCallback) {
                    $rootScope.idbstore.remove(storeName, id).then(successCallback, errorCallback);
                },
                put: function(object, successCallback, errorCallback) {
                    //console.log($rootScope.idbstore);
                    $rootScope.idbstore.add(storeName, object).then(successCallback, errorCallback);
                },
                update: function(object, successCallback, errorCallback) {
                    var ciphered = CipherBoom().getEncryptedObject(object);
                    $rootScope.idbstore.updatev2(storeName, ciphered).then(successCallback, errorCallback);
                },
                where: function(match, successCallback, errorCallback) {
                    $rootScope.idbstore[storeName].query().all().execute().then(function(list) {
                        var decrypted = [];
                        for (i in list) {
                            _.each(match, function(v, f) {
                                var doc = CipherBoom().getDecryptedObject(list[i]);
                                if (doc[f] != undefined && doc[f] == v) {
                                    decrypted.push(doc);
                                }
                            });
                            // decrypted.push(CipherBoom().getDecryptedObject(list[i]));
                        }
                        successCallback(decrypted);
                    }, errorCallback);
                }
            }
            //console.log(deferred);

        deferred.resolve(scope);

        // deferred.resolve(scope);

        return deferred.promise;
    }






    return {
        init: init
    }
});