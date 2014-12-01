'use strict';

angular.module('myApp.controllers', [])
// controller for the basic navigation of the app
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
            {id:3, label:'Projects', path:'/projects'},
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
        $scope.getGeo = function() { 
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

 
        
    

