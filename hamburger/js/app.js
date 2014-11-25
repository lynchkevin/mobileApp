'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.memoryServices'])

.constant('webBase','/') //use this for development
.constant('phoneGapBase','')//use this for phonegap

.run(['$rootScope', '$browser', function ($rootScope, $browser){
    //  This used to be required when ng-view was inside an ng-include
    //  $route.reload();
    
    //Test to see if website or phonegap
    var mobileDevice = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    $rootScope.mobileDevice = mobileDevice;   
    if ( mobileDevice ) {
        // if mobile add fastclick
        new FastClick(document.body);
        // set the baseUrl 
        $rootScope.baseUrl = '';
        console.log("running on device");
    } else {
        console.log("running on desktop");
        $rootScope.baseUrl = '/'
    }
    console.log(".run is up and running!");
}])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
    var mobileDevice = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    var baseUrl = '/';
    if (mobileDevice) {
        baseUrl = '';
    } 
    console.log('base url is '+ baseUrl);
    $routeProvider.when('/geotest', {
        template: '<h1>GeoTest!!</h1>'
    });
    $routeProvider.when('/employees', {
        templateUrl: baseUrl+'partials/employee-list.html', 
        controller: 'EmployeeListCtrl'
    }); 

    $routeProvider.when('/employees/:employeeId', {
        templateUrl: baseUrl + 'partials/employee-detail.html', 
        controller: 'EmployeeDetailCtrl'
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


