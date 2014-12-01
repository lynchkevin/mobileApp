'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngResource',
    'myApp.controllers',
    'myApp.cordovaServices',
    'myApp.restServices'])


.run(['$rootScope', function ($rootScope){
    //  This used to be required when ng-view was inside an ng-include
    //  $route.reload();
    //Test to see if website or phonegap
    var mobileDevice = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $rootScope.mobileDevice = mobileDevice;   
    if ( mobileDevice ) {
       // if mobile add fastclick
        new FastClick(document.body);
        console.log("running on device");
    } else {
        console.log("running on desktop");
    }
}])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/geotest', {
        templateUrl: 'partials/geo-test.html',
        controller: 'GeoCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
    
    //set htmnl5Mode to false so it works with phonegap
    $locationProvider.html5Mode(false);

 //   $httpProvider.defaults.useXDomain = true;    
 //   $httpProvider.defaults.withCredentials = true;  
//    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
//    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $httpProvider.defaults.headers.common.Authorization = 'Basic a2x5bmNoQHZvbGVycm8uY29tOmhpbmF1bHQ=';
    
}]);



