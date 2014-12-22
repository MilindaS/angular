myApp.factory('API', function($q, $rootScope, $http, Session, config, SerializeObj) {
    var s = this;

    var request = function(endpoint, payload) {
        var defer = $q.defer();
        Session.get('client').then(function(result) {
            if (result == null || result == undefined) {
                getTocken().then(function(data) {
                    defer.resolve(data);
                });
            } else {

            }
        });

        return defer.promise;
    }

    var getTocken = function() {

        var data = {
            'appversion': '2.0'
        }

        var defer = $q.defer();

        $http({
            url: config.apipath + '/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: SerializeObj(data)
        }).then(function(data) {
            defer.resolve(data);
        });

        return defer.promise;
    }


    return {
        request: request,
        getTocken: getTocken
    }
});