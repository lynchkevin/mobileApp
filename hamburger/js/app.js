'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.memoryServices'])

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
    console.log(".run is up and running!");
}])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

   $routeProvider.when('/geotest', {
        template: '<h1>GeoTest!!</h1>'
    });
    $routeProvider.when('/employees', {
        templateUrl: 'partials/employee-list.html', 
        controller: 'EmployeeListCtrl'
    });   
     $routeProvider.when('/undefined', {
        template: '<h1> This route is undefined! </h1>', 
    });      
    $routeProvider.otherwise({redirectTo: '/undefined'});
    //enable html5 mode if on desktop
    var mobileDevice = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    console.log(mobileDevice);
    $locationProvider.html5Mode(!mobileDevice);
}])

/*
.config(['$locationProvider','$routeProvider', function ($locationProvider, $routeProvider) {
 
   // check if running on mobileDevice - can't use rootScope in config

    $locationProvider.html5Mode.enabled(false);

   $routeProvider.when('/geotest', {
        template: '<h1>GeoTest!!</h1>'
    });
    $routeProvider.when('/employees', {
        templateUrl: 'partials/employee-list.html', 
        controller: 'EmployeeListCtrl'
    });   
     $routeProvider.when('/undefined', {
        template: '<h1> This route is undefined! </h1>', 
    });      
    $routeProvider.otherwise({redirectTo: '/undefined'});
}])
*/

/* 
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/employees', {
        templateUrl: 'partials/employee-list.html', 
        controller: 'EmployeeListCtrl'
    });
    $routeProvider.when('/employees/:employeeId', {
        templateUrl: 'partials/employee-detail.html', 
        controller: 'EmployeeDetailCtrl'
    });
    $routeProvider.when('/employees/:employeeId/reports', {
        templateUrl: 'partials/report-list.html', 
        controller: 'ReportListCtrl'});
    $routeProvider.otherwise({redirectTo: '/employees'});

}])
*/


