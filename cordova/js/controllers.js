'use strict';

angular.module('myApp.controllers', [])
    .controller('GoGeo',['$scope','$rootScope',function($scope,$rootScope) {
        var self = this;
        self.doit = function() {
            $scope.status = "Waiting...";
            app.bindEvents($rootScope.mobileDevice);
        };
    }])
                             
    .controller('GeoCtrl', ['$scope','Geolocation','Cordova',  
    function ($scope, GeoLocation, Cordova) {
        $scope.current = GeoLocation.currentPosition();
        $scope.coords = 'service in process..';
        $scope.status = 'waiting...';
        $scope.waiting = true;
        Cordova.getCurrentPosition(
            function(position) {
            $scope.coords = position.coords;  
            $scope.timestamp = position.timestamp;
            $scope.status = "complete"
            $scope.waiting = false;
            }
        );
    }]);
    

