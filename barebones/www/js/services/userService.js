'use strict';

/**
* A factory to wrap pubnub   
*/
angular.module('barebonesApp')
    .service('userService', ['$http','baseUrl', function ($http, baseUrl) {

    this.assignUser = function() {
        var url = baseUrl.endpoint+'/api/user';
        var promise = $http.get(url).then(
            function(resp) {
                console.log('Success',resp);
                var user = resp.data;
                var uuid = user.firstName+"_"+user.lastName;  
                return uuid;
            });
        return promise;
    };
}]);
              
