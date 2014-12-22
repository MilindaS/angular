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


myApp.run(function($q, $rootScope, $location, $http, $timeout, config, Auth, YDNDBService) {

    $rootScope.$on('$routeChangeStart', function() {

        initDb(YDNDBService, config.DB_NAME);
        routeHandle(Auth);
        // Checking user has been logged
        //console.log(config.DB_NAME);




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








    //var db = new ydn.db.Storage('system', schema);
    //$rootScope.ds = db;
}

window.routeHandle = function(Auth) {
    var isLoggedIn = Auth.isLoggedIn();

    //console.log(isLoggedIn);
    isLoggedIn.then(function(data) {
        //console.log(data);
        if (_.isNull(data)) {

        } else {
            //console.log(data);

        }


    });
}