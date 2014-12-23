myApp.factory('SyncService', function($q, $rootScope, YDNDBService, Session, API) {

    var start = function() {
        console.log('Syncing..');

        var defer = $q.defer();
        var data = [];

        Session.get('authorized').then(function(result) {

            var res = angular.fromJson(result);
            data['token'] = res['token'];

            API.request('/sync', data).then(function(result) {
                var resData = result.data.data.data;

                var model = null;

                //                console.log(resData);
                //              return false;

                YDNDBService.init().then(function(scope) {
                    // scope.put('product', model);
                    // console.log(result);

                    for (iData in resData) {
                        //console.log(resData[iData]['_id'].$id);
                        model = {
                            id: resData[iData]['_id'].$id,
                            name: resData[iData]['product_name'],
                            description: resData[iData]['product_desc'],
                            price: resData[iData]['product_price'],
                        };
                        scope.put('product', model);
                    }
                });



                // for (iData in resData) {

                //     model = {
                //         id: Date.now(),
                //         name: resData[iData]['product_name'],
                //         description: resData[iData]['product_desc'],
                //         price: resData[iData]['product_price'],
                //     };
                //     //console.log(resData[iData]);

                // }

            });

        });

        // console.log(res['token']);
        // data = 1;
        // //data['token'] = 1;
        // API.request('/sync', data).then(function(result) {
        //     //console.log(result);
        //     console.log(result.data);
        // });

    }


    return {
        start: start
    }


});