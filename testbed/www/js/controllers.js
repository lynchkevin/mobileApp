'use strict';

angular.module('myApp.controllers', [])

    //a controller that uses pure javascript for testing purposes
    .controller('GoGeo', ['$scope', '$rootScope', function ($scope, $rootScope) {
        var self = this;
        self.doit = function () {
            $scope.status = "Waiting...";
            app.bindEvents($rootScope.mobileDevice);
        };
    }])
     
    // angular controller that calls cordova-services
    .controller('GeoCtrl', ['$scope', 'CordovaGeo',  
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
   // angular controller that calls cordova-services
    .controller('CamCtrl', ['$scope','CordovaCam',  
    function ($scope, Cordova) {
        var self = this;
        self.getPic = function() { 
            $scope.status = "waiting...";
            $scope.waiting = true;
            Cordova.getPic(
                function(imageData) {
                    var formated = formatPosition(position);
                    $scope.coords = formated;
                    $scope.timestamp = formated.timestamp;
                    $scope.status = "complete"
                    $scope.waiting = false;
                },
                function(message) {
                    console.log("Picture Failed : " + message);
                },
                {
                    quality: 100,
                    targetWidth: 400,
                    targetHeight: 400,
                    correctOrientation: true
                }
            );
        };
    }]) 

//a controller that calls volerro API to get projects
.controller('ProjectListCtrl', ['$scope', '$rootScope', 'ProjectStore', 
                function ($scope, $rootScope, ProjectStore) {
                var self = this;
                $scope.projects = ProjectStore.get();
                $scope.projects.$promise.then(function(data) {
                    $scope.projects = buildTree(data.projects);
                })
    }])   

//a controller that calls volerro API to get projects
.controller('LoginCtrl', ['$scope', '$rootScope', '$http', 'Login', 
                function ($scope, $rootScope, http, Login) {
                var self = this;

                $scope.message = "";
                $scope.do_login = function() {
                    if(!angular.isDefined($scope.userName) || !angular.isDefined($scope.password)){
                        $scope.message = "please enter your credentials";
                    }
                    else{
                        Login.tryCredentials($scope.userName,$scope.password)
                        .then(function(data){
                            if(angular.isDefined(data.errors)){
                                $scope.message = data.errors[0];
                            } else {
                                $scope.message = $scope.userName+" is logged in";
                                console.log(Login.getEncoded());
                            }
                        },function(error) {
                            $scope.message = "login service failed :"+error;
                        });
                    }
                }
    }])   

    function findByID(array, id) {
        var elementPos = array.map(function(x) {return x.id; }).indexOf(id);
        var objectFound = array[elementPos];   
        return objectFound;
    }

    function findByID(array, id) {
        var elementPos = array.map(function(x) {return x.id; }).indexOf(id);
        var objectFound = array[elementPos];   
        return objectFound;
    }
    function buildTree(array){
        var tree = [];
        var treeIdx = 0;
        for(var i = 0; i < array.length; i++){
            var obj = array[i];
            if(!obj.child) {
                tree[treeIdx++] = obj;
            }else {
                var parent = findByID(array,obj.parent);
                if(angular.isDefined(parent)) {
                    if(!angular.isDefined(parent.children)) {
                        parent.children = [];
                    }
                    parent.children.push(obj);
                }
            }
        }
        return tree;
    }
                

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

 
        
    

