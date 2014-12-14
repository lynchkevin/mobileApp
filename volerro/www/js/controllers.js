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
    .controller('ProjectListCtrl', ['$scope', '$rootScope','ProjectStore','TreeCache',
                function ($scope, $rootScope, ProjectStore, treeCache) {
                var self = this;
                self.start = new Date();
                if(angular.isDefined(treeCache.get("projects"))) {
                       $scope.projects = treeCache.get("projects");
                } else {
                $scope.projects = ProjectStore.get( function(data) {
                    self.stop = new Date();
                    self.time = self.stop - self.start;
                    $scope.projects = buildTree(data.projects);
                    treeCache.put("projects",$scope.projects);     
                });
                }
    }])   
    // show the project details
    .controller('ProjectDetailCtrl', ['$scope', '$rootScope', '$routeParams', 'Project', 
                function ($scope, $rootScope, $routeParams, Project) {
                $scope.project = Project.get({project: $routeParams.projectId});
                $scope.project.$promise.then(function(data) {
                    $scope.project = data;
                });
    }])
    
    // show the project view using 2 resources
    .controller('ProjectViewCtrl', ['$scope', '$rootScope', '$routeParams', 'Project', 'Content',
                function ($scope, $rootScope, $routeParams, Project, Content) {
                $scope.project = Project.get({project: $routeParams.projectId});
                $scope.project.$promise.then(function(data) {
                    $scope.project = data;
                    $scope.project.boards.forEach(function(bData){
                        Content.query({board:bData.id},function(cData){
                           bData.cards = cData.contents;
                        });
                    });
                });
    }])
    
    //a controller that calls volerro API to get projects
    .controller('BoardListCtrl', ['$scope', '$rootScope','$routeParams','Board',
                function ($scope, $rootScope, $routeParams, Board) {
                var self = this;
                Board.query({project:$routeParams.projectId},function(data){
                    $scope.boards = data.boards;
                });
    }])   
    //a controller that calls volerro API to get projects
    .controller('CardListCtrl', ['$scope', '$rootScope','$routeParams','Content',
                function ($scope, $rootScope, $routeParams, Content) {
                var self = this;
                Content.query({board:$routeParams.boardId},function(data){
                    $scope.cards = data.contents;
                });
    }]) 
    .controller('BoardCtrl', ['$scope', '$rootScope','$window','Content', 'Login',
                function ($scope, $rootScope, $window, Content, Login) {
                var self = this;
                self.w = angular.element($window);
                self.retries = 0;
                self.loggedIn = false;
                    
                self.sizeIt = function() {
                    if(angular.isDefined($scope.cards)) {
                        $scope.boardHeight = calcBoardHeight($scope.cards.length,self.w.orientation)+"px";
                    } else {
                        $scope.boardHeight = calcBoardHeight(0,self.w.orientation)+"px";
                    }
                };
                self.retry = function() {
                     Content.query({board:$scope.board.id},function(data){
                    if(angular.isDefined(data.contents)) {
                        $scope.cards = data.contents;
                        self.sizeIt();
                        self.addCardIcons();
                        self.retries = 0 ;
                    } else {
                        if(self.retries++ < 2) {
                            self.retry()
                            console.log("retries = "+self.retries);
                        } else { 
                            alert("Content.query failed!");
                             }
                        }
                    })};
                
                self.addCardIcons = function() {
                    for(var i=0; i<$scope.cards.length;i++) {
                        var card = $scope.cards[i];
                        if(!card.card && !card.task) {
                            var ext = card.name.substring(card.name.lastIndexOf('.')+1);
                            var x = ext.slice(-1);
                            if(x=='x') {
                                ext = ext.substring(0,ext.length - 1);
                                
                            }
                            $scope.cards[i].icon = ext+'.png';
                        } 
                    }
                };
                    
                self.w.bind('resize', function() {
                    self.sizeIt();
                    $scope.$apply();
                });
                self.w.bind('orientationchange',function() {
                    self.sizeIt();
                    $scope.$apply();
                });

                Content.query({board:$scope.board.id},function(data){
                    if(angular.isDefined(data.contents)) {
                        $scope.cards = data.contents;
                        self.sizeIt();
                        self.addCardIcons();
                        self.retries = 0;
                    } else {
                        self.retry();
                    }
                },
                function(error) {
                    alert('content query returned error :'+error);
                });

                
    }]) 
//a controller that logs a user in
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
                                $rootScope.go('/projects');
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
                
    function formatValue(val, len) {
        if(val === null) {
            return val;
        } else {
            return val.toString().substr(0,len);            
        }   
    }
            
    function formatPosition(position) {
        var p = {};
        p.latitude = formatValue(position.coords.latitude, 8);
        p.longitude = formatValue(position.coords.longitude, 8)
        p.timestamp = formatValue(position.timestamp, 10); 
        p.altitudeAccuracy = formatValue(position.coords.altitudeAccuracy,8);
        p.altitude = formatValue(position.coords.altitude, 10);
        p.speed = formatValue(position.coords.speed, 8);
        p.heading = formatValue(position.coords.heading, 8);
        p.accuracy = formatValue(position.coords.accuracy, 8);
        return p;
    }
    
function getViewport() {

 var viewPortWidth;
 var viewPortHeight;

 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }

 // older versions of IE
 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 return [viewPortWidth, viewPortHeight];
}

function calcBoardHeight(nCards,orientation) {
    var screen_params = {
    'card_height': 42,
    'height_factor': 0.7,
    'width_factor':0.6
    };
    if(nCards < 1) { nCards = 1;}
    var vp = getViewport();
    var maxHeight = (vp[1]-70)-(vp[1]*0.02);
    maxHeight = 0.8 * maxHeight;
    /*
    if(vp[0] < vp[1]) {
        // protrate...
            maxHeight = Math.floor(screen_params.height_factor*vp[1]); 
        } else {
        // landscape
            maxHeight = Math.floor(screen_params.width_factor*vp[1]);
    }
    */
    var height = (nCards * screen_params.card_height);
    var h;
    height < maxHeight? h=height : h=maxHeight;
    return h;
};

 
        
    

