'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'myApp.controllers',
    'myApp.cordovaServices'])


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

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/geotest', {
        templateUrl: 'partials/geo-test.html',
        controller: 'GeoCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});
    
    //set htmnl5Mode to false so it works with phonegap
    $locationProvider.html5Mode(false);
}])



