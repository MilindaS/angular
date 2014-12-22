myApp.factory('Auth', function($q, $rootScope, Session, API) {

    var login = function(credential) {
        return API.request('/login', credential);
    }

    var isLoggedIn = function() {

        var defer = $q.defer();

        var todo = Session.get('authorized');

        defer.resolve(todo);
        return defer.promise;
    }

    var getToken = function() {
        var defer = $q.defer();
        API.getTocken('/token', '').then(function(data) {
            Session.put('authorized', angular.toJson(data.data.data)).then(function() {
                defer.resolve(true)
            });
        });

        return defer.promise;
    }



    return {
        login: login,
        isLoggedIn: isLoggedIn,
        getToken: getToken
    }






});