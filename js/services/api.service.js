myApp.factory('API', function($q, $rootScope, $http, Session, config, SerializeObj) {
    var s = this;

    var request = function(endpoint, payload) {
        var defer = $q.defer();
        Session.get('authorized').then(function(result) {
            if (result == null || result == 'undefined') {
                console.log('No Token');
            } else {
                parsedData = angular.fromJson(result);
                payload['token'] = parsedData['token'];
                payload['appversion'] = '2.0';

                $http({
                    url: config.apipath + endpoint,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: SerializeObj(payload)
                }).then(function(data) {
                    //console.log(data.data);
                    defer.resolve(data);
                });
            }
        });

        return defer.promise;
    }

    var getTocken = function(endpoint, payload) {

        var defer = $q.defer();

        $http({
            url: config.apipath + endpoint,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: SerializeObj(payload)
        }).then(function(data) {
            //console.log(data);
            defer.resolve(data);
        });

        return defer.promise;
    }


    return {
        request: request,
        getTocken: getTocken
    }
});