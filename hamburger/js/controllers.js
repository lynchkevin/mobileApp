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
        {id:1, label:'Geo Test', path:'/geotest'},
        {id:2, label:'Employees', path:'/employees'},
        {id:3, label:'Item 3'},
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
        $scope.picPath = $rootScope.mobileDevice ? '' : '../';
        
        $scope.employee = Employee.get({employeeId: $routeParams.employeeId});
    }])
    .controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', 
                                   function ($scope, $routeParams, Report) {
        $scope.employees = Report.query({employeeId: $routeParams.employeeId});
    }]);
    

