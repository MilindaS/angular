myApp.controller('LoginCtrl',
    function($q, $scope, $rootScope, $location, $alert, MDBService, Auth, Session, config) {
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
                    // var myAlert = $alert({
                    //     title: '',
                    //     content: 'Sorry Da, Username nd Password is invalid!',
                    //     placement: 'top',
                    //     type: 'info',
                    //     show: true
                    // });
                    bootbox.alert("Username and password is invalid !");
                }
            });

        }
    }
);