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
//drag and drop controller
/*
.controller('DragDropCtrl', ['$scope', '$rootScope',
                function ($scope, $rootScope) {
                
                $scope.boards = [
                    {name:'board1',id:'#bd1'},
                    {name:'board2',id:'#bd2'},
                    {name:'board3',id:'#bd3'},
                    {name:'board4',id:'#bd4'},
                    {name:'board5',id:'#bd5'},
                ];
                $scope.insertAt = 0;
                             
                $scope.dropSuccessHandler = function($event,index,array){
                    // array.splice(index,1);
                };
      
                $scope.onDrop = function($event,$data,array){
                    array.splice($scope.insertAt,0,$data);
                    array.splice(index,1);
                };
                    

    }]) 
*/

	.directive('captureCoords', function() {
		return function(scope, element, attrs) {
            var el = element[0];
            var b = scope.board;
            b.top = el.offsetTop;
            b.left = el.offsetLeft;
            b.width = el.offsetWidth;
            b.height = el.offsetHeight;
		}
	})
    .directive("addDropZone", function() {
        return {
            link: function(scope, element, attrs) {
                    var el = element[0];
                    var beingDragged;
                    var lastX;
                    var margin;
                    var insertAt;
                        
                    reset();
                
                    var onMyLeft = scope.$$prevSibling;
                    var onMyRight = null;
                
                    scope.setNextSibling = function (sibling) {
                        onMyRight = sibling;
                    }
                    
                    if(onMyLeft != null) {
                        onMyLeft.setNextSibling(scope);
                    }
                
                    scope.clear = function() {
                        margin = ''
                        lastX = -1;
                        attrs.$set('style',margin);
                    }
                    
                    element.bind("dragover", function(event) {
                        if(!beingDragged) {
                            console.log(event.offsetX);
                            if(lastX != -1) {
                                if(lastX < event.pageX) {
                                    //moving right
                                    console.log('moving right: over '+scope.$index);
                                    margin = 'margin-right:210px'; 
                                    insertAt = scope.$index+1;
                                }
                                if(lastX > event.pageX) {
                                    //moving left
                                    console.log('moving left: over '+scope.$index);
                                    margin = 'margin-left:210px';
                                    insertAt = scope.$index;
                                }
                                lastX = event.pageX;
                            } else {
                                lastX = event.pageX;
                            }
                            attrs.$set('style',margin);
                        }
                    });
                
                    element.bind("dragenter", function() {
                        if(angular.isDefined(onMyLeft) && onMyLeft != null){
                           onMyLeft.clear();
                        }
                        if(angular.isDefined(onMyRight) && onMyRight != null) {
                            onMyRight.clear();
                        }
                    });
                
                    function reset() {
                        lastX = -1;
                        margin = '';
                        attrs.$set('style',margin);
                        beingDragged=false;
                        insertAt = -1;
                    }
                
                    element.bind("dragend", function() {
                        scope.returnIdx = insertAt;
                        reset();
                    });
                
                    element.bind('dragstart', function(event) {
                         beingDragged = true;
                        }
                        
                    );
                
                    var angListener = scope.$on('ANGULAR_DRAG_END',function() {
                        reset();
                    });
                    scope.$on('$destroy', angListener);
                }
            }
    })
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

 
        
    

