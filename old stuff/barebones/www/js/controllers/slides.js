'use strict';

/**
 * @ngdoc function
 * @name barebonesApp.controller:SlideCtrl
 * @description
 * # SlideCtrl
 * Controller of the barebonesApp to Browse Slide Thumbnails
 */
angular.module('barebonesApp')
  .controller('SlideCtrl', ['$scope', function ($scope) {
  
    var BASEFILENAME = "img/Slide",
    filename = "",
    current = 0;  

      
    $scope.slides = [];
    $scope.pubnub = PUBNUB.init( {
     publish_key: 'pub-c-19a2e5ee-5b70-435d-9099-65ae53e5b149',
     subscribe_key: 'sub-c-0f2a418a-b9f1-11e4-80fe-02ee2ddab7fe'
    });      

      
    $scope.init = function() {
        for (var i = 1; i<9;i++){
            filename = BASEFILENAME+i.toString()+".png";
            $scope.slides.push(filename);
            }
            current = 0;
            $scope.mapShowing = false;
            $scope.buttonText = "Show All"
            $scope.channel = "view_channel";
            $scope.setSlide(current);
    };
      
    $scope.toggleMap = function(){
        $scope.mapShowing = !$scope.mapShowing;
        $scope.buttonText = $scope.mapShowing ? "Hide All" : "Show All";
    }

    
    $scope.nextSlide = function() {
        $scope.setSlide(++current);
    };
    
    $scope.prevSlide = function() {
        $scope.setSlide(--current);
    };
      
    $scope.setSlide = function(slideNumber) {
        if(slideNumber >= $scope.slides.length-1) {
            current = $scope.slides.length-1;
            $scope.nextEnabled = false;
            $scope.prevEnabled = true;
        } else if(slideNumber <= 0) {
            current = 0;
            $scope.prevEnabled = false;
            $scope.nextEnabled = true;
        } else {   
            current = slideNumber;
            $scope.nextEnabled = true;
            $scope.prevEnabled = true;
        }
        $scope.viewingSlide = $scope.slides[current];
        //tell the viewers to update their slide
        var msg = current.toString();
        console.log(msg);
        console.log($scope.channel);
        $scope.pubnub.publish({
            channel: $scope.channel,
            message: msg
        });        

    };
    
    $scope.viewIdx = function() {
        return current;
    }
    
    $scope.init();
    
  }]);
