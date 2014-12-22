myApp.controller('ProductCtrl', ['$q', '$scope', '$rootScope', 'YDNDBService',
    function($q, $scope, $rootScope, YDNDBService) {
        $scope.page = {
            title: 'Product'
        }

        $scope.products = [];

        $scope.save_status = null;



        var objects = [];

        var getItems = function() {

            $scope.reset();

            YDNDBService.init().then(function(scope) {
                scope.getAll('product').then(function(data) {
                    $scope.products = data;
                    $scope.$apply;
                });
            });

        }

        $scope.submit = function() {
            var data = $scope.model;
            YDNDBService.init().then(function(scope) {
                scope.put('product', data).then(function() {
                    scope.getAll('product').then(function(data) {
                        $scope.products = data;
                        $scope.$apply;
                    });
                });
                $('#myModal').modal('toggle');
                $scope.reset();
            });

        },

        $scope.remove = function(id) {
            bootbox.confirm("Are you sure?", function(result) {
                if (result) {
                    YDNDBService.init().then(function(scope) {
                        scope.remove('product', id);
                        $scope.$apply;
                    });
                    getItems();
                }
            });
        }

        $scope.reset = function() {
            $scope.model = {
                id: Date.now(),
                name: '',
                description: '',
                price: '',
            };
        }

        $scope.edit = function(id) {
            YDNDBService.init().then(function(scope) {
                scope.get('product', id).then(function(data) {
                    //console.log(id);

                    $scope.model = {
                        id: id,
                        name: data['name'],
                        description: data['description'],
                        price: data['price'],
                    };

                    $scope.$apply();

                    $('#myModal').modal('toggle');

                });
            });

        }
        getItems();


    }
]);