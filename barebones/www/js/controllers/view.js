'use strict';

/**
 * @ngdoc function
 * @name barebonesApp.controller:SlideCtrl
 * @description
 * # SlideCtrl
 * Controller of the barebonesApp to Browse Slide Thumbnails
 */
angular.module('barebonesApp')
  .controller('ViewCtrl', ['$scope', 'pnFactory', 'userService', 'presentationService', function ($scope, pnFactory, userList, presentService) {
  
    var BASEFILENAME = "img/Slide";
    var filename = "";
    var current = 0;
    var userID = "anonymous";

    
    userList.assignUser().then(function(userID) {
        pnFactory.init(userID);        
        $scope.init();   
    },function(err){
        console.log(err);
    });

       
    $scope.init = function() {
       // newPresentation();
        $scope.channel = pnFactory.newChannel("view_channel");
        // subscribe and wait for slide number...
        $scope.channel.subscribe(handleMessage,handlePresence);
        $scope.channel.hereNow(handleHereNow);

    };
      
    $scope.cleanUp = function(){
        $scope.channel.unsubscribe();
    };
      
    function newPresentation(){
        presentService.getPresentation().then(function(pres){
            $scope.presentation = pres;
            current = 0;
            $scope.setSlide(current);
        },function(err){
            console.log("view init: get presentations fails",err);
        });
    }
      
    function handleMessage(m) {
        if(isNaN(m)){
            if(m=="newPresentation"){
                $scope.$apply(function(){
                    newPresentation();
                });
            }
        }else{
            var toSlide = parseInt(m);
            $scope.$apply(function(){
                $scope.setSlide(toSlide);
            });
        }
    }
      
    function handleHereNow(m){
        console.log(m);
    }
    
    function handlePresence(m){
        $scope.channel.hereNow(handleHereNow);
    }
      
    $scope.nextSlide = function() {
        $scope.setSlide(++current);
    };
    
    $scope.prevSlide = function() {
        $scope.setSlide(--current);
    };
      
    $scope.setSlide = function(slideNumber) {
        current = slideNumber;
        $scope.viewingSlide = $scope.presentation.slides[current];
    };
    
      
    $scope.$on('$destroy', function(){
        $scope.cleanUp();
    });
    $scope.$on('$locationChangeStart', function(){
        $scope.cleanUp();
    });
  }]);
