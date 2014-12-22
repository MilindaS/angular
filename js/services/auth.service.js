myApp.factory('Auth', function($q, $rootScope, Session, API) {

    var login = function(credential) {
        var defer = $q.defer();
        API.request('/login', credential).then(function(data) {
            Session.put('authorized', angular.toJson(data.data.data)).then(function() {
                defer.resolve(true)
            });
        });

        return defer.promise;
    }

    var isLoggedIn = function() {
        var defer = $q.defer();

        var todo = Session.get('authorized');

        defer.resolve(todo);
        return defer.promise;
    }





    return {
        login: login,
        isLoggedIn: isLoggedIn
    }






});