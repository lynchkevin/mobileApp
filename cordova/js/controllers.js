'use strict';

angular.module('myApp.controllers', [])

    //a controller that uses pure javascript for testing purposes
    .controller('GoGeo',['$scope','$rootScope',function($scope,$rootScope) {
        var self = this;
        self.doit = function() {
            $scope.status = "Waiting...";
            app.bindEvents($rootScope.mobileDevice);
        };
    }])
     
    // angular controller that calls cordova-services
    .controller('GeoCtrl', ['$scope','CordovaGeo',  
    function ($scope, Cordova) {
        var self = this;
        self.getGeo = function() { 
            $scope.status = "waiting...";
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
        };
    }])     

    function formatPosition(position) {
        var p = {};
        p.latitude = position.coords.latitude.toString().substr(0,8);
        p.longitude = position.coords.longitude.toString().substr(0,8);
        p.timestamp = position.timestamp.toString().substring(0,10);
        p.altitudeAccuracy = position.coords.altitudeAccuracy;
        p.altitude = position.coords.altitude;
        p.speed = position.coords.speed;
        p.heading = position.coords.heading;
        p.accuracy = position.coords.accuracy;
        return p;
    };       
        
    

