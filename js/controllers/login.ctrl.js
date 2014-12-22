myApp.controller('LoginCtrl',
    function($q, $scope, $rootScope, $location, MDBService, Auth, Session, config) {
        $scope.pageTitle = 'Sign In';

        $scope.credential = {
            username: '',
            password: ''
        }

        //Session.put('client', '2');
        // Auth.isLoggedIn().then(function(val) {
        //     console.log(val);
        // });
        //console.log(config.apipath);
        $scope.login = function() {
            //        alert($scope.credential.username);
            Auth.login($scope.credential).then(function(data) {
                if (data.data.status) {
                    Session.put('client', angular.toJson(data.data.data));
                    $location.path('/product');
                } else {
                    alert('Username and Password are invalid');

                }
            });

        }
    }
);