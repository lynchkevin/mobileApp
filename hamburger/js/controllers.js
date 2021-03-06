'use strict';

angular.module('myApp.controllers', [])
  .controller('NavCtrl', ['$scope', '$rootScope', '$window', '$location', 
                          function($scope, $rootScope, $window, $location) {
    /* ng-include breaks css inheritance so we need to fix it */

    var self = this;
    self.isOpen = false;
    self.showSearch = false;
    self.selected= { id:'', label:''};
    self.menuItems = [
        {id:1, label:'Home', path:'/'},
        {id:2, label:'Geo Test', path:'/geotest'},
        {id:3, label:'Employees', path:'/employees'},
        {id:4, label:'Item 4'},
        {id:5, label:'Item 5'}
    ];
    // control the menu and search buttons
    self.openToggle = function() {
        self.isOpen = !self.isOpen;
    };
    self.searchToggle = function() {
        self.showSearch = !self.showSearch;
    };
    self.open = function(){
        self.isOpen = true;
    };
    self.close = function(){
        self.isOpen = false;
    };
    self.select = function(item){
        self.selected=item;
        if(angular.isUndefined(self.selected.path)){
            self.selected.path = '/undefined';
        }
        $rootScope.go(self.selected.path);
        self.close();
    }
    //define go and back functions
    $rootScope.back = function() {
        $scope.slide = 'slide-right';
        $window.history.back();
    }
    $rootScope.go = function(path){
        $scope.slide = 'slide-left';
        $location.url(path);
    }   
    self.isMobile = $rootScope.mobileDevice;
  }])

    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', 
                             function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';

    }])
    .controller('EmployeeListCtrl', ['$scope', 'Employee', 
                                     function ($scope, Employee) {
        $scope.employees = Employee.query();
    }])
    .controller('EmployeeDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Employee', 
                                       function ($scope, $rootScope, $routeParams, Employee) {
        
        $scope.employee = Employee.get({employeeId: $routeParams.employeeId});
    }])
    .controller('ReportListCtrl', ['$scope', '$rootScope', '$routeParams', 'Report', 
                                   function ($scope, $rootScope, $routeParams, Report) {
        $scope.employees = Report.query({employeeId: $routeParams.employeeId});
    }])
    .controller('GeoCtrl', ['$scope','CordovaGeo',  
    function ($scope, Cordova) {
        var self = this;
        $scope.getGeo = function() { 
        $scope.status = 'waiting...';
        $scope.waiting = true;
        Cordova.getCurrentPosition(
            function(position) {
            var formated = formatPosition(position);
            $scope.coords = formated;
            $scope.timestamp = formated.timestamp;
            $scope.status = "complete"
            $scope.waiting = false;
            }
        );
        }
    }]);

function formatPosition(position) {
    var p = {};
    p.latitude = clip(position.coords.latitude,8);
    p.longitude = clip(position.coords.longitude,8);
    p.timestamp = clip(position.timestamp,11);
    p.altitudeAccuracy = clip(position.coords.altitudeAccuracy,8);
    p.altitude = clip(position.coords.altitude,8);
    p.speed = clip(position.coords.speed),8;
    p.heading = clip(position.coords.heading,8);
    p.accuracy = clip(position.coords.accuracy,8);
    return p;
}

function clip(value, size) {
    var v = {};
    value !== null ? v= value.toString().substr(0,size) : v = value;
    return v;
};
    

