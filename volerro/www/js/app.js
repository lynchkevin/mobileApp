'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'myApp.controllers',
    'myApp.filters',
    'myApp.restServices',
    'myApp.cordovaServices'])

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
        $rootScope.baseUrl = '/';
    }
    console.log(".run is up and running!");
}])

.config(['$routeProvider', '$locationProvider','$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/geotest', {
        templateUrl: 'partials/geo-test.html',
        controller: 'GeoCtrl'
    });
    $routeProvider.when('/projects', {
        templateUrl: 'partials/project-list.html', 
        controller: 'ProjectListCtrl'
    }); 

    $routeProvider.when('/projects/:projectId', {
        templateUrl: 'partials/project-detail.html', 
        controller: 'ProjectDetailCtrl'
    });
    $routeProvider.when('/employees/:employeeId/reports', {
        templateUrl: 'partials/report-list.html', 
        controller: 'ReportListCtrl'});
    $routeProvider.when('/undefined', {
        template: '<h1> This route is undefined! </h1>', 
    });   
    $routeProvider.otherwise({redirectTo: '/'});
    
    //set htmnl5Mode to false so it works with phonegap
    $locationProvider.html5Mode(false);
    
    // set http headers for basic authorization to the API
    $httpProvider.defaults.headers.common.Authorization = 'Basic a2x5bmNoQHZvbGVycm8uY29tOmhpbmF1bHQ=';
}])



