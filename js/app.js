var myApp = angular.module('myApp', ['ngRoute', 'nics.Config', 'nics.Cipher', 'Config', 'n.URI']);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'tpl/home.htm',
            controller: 'HomeCtrl'
        })
            .when('/product', {
                templateUrl: 'tpl/product.htm',
                controller: 'ProductCtrl'
            })
            .when('/contact', {
                templateUrl: 'tpl/contact.htm',
                controller: 'ContactCtrl'
            })
            .when('/login', {
                templateUrl: 'tpl/login.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: 'tpl/404.htm'
            });
    }
]);


myApp.run(function($q, $rootScope, $location, $http, $timeout, config, Auth, YDNDBService, Session) {

    $rootScope.$on('$routeChangeStart', function() {

        initDb(YDNDBService, config.DB_NAME);
        routeHandle(Auth, Session, $location);
    });
});

window.initDb = function(YDNDBService, DB_NAME) {
    var schema = {
        stores: [{
            name: 'product',
            keyPath: 'id'
        }, {
            name: 'client',
            keyPath: 'id'
        }]
    };
    YDNDBService.init().then(function(scope) {
        scope.createDB(DB_NAME, schema);
    });
}

window.routeHandle = function(Auth, Session, location) {
    var isLoggedIn = Auth.isLoggedIn();

    isLoggedIn.then(function(data) {
        if (_.isNull(data) || data == 'undefined') {
            Auth.getToken();
        } else {}
    });

    Session.get('client').then(function(data) {
        if (_.isNull(data) || data == 'undefined') {

        } else {}
    });
}