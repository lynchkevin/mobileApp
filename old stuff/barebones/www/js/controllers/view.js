'use strict';

/**
 * @ngdoc function
 * @name barebonesApp.controller:SlideCtrl
 * @description
 * # SlideCtrl
 * Controller of the barebonesApp to Browse Slide Thumbnails
 */
angular.module('barebonesApp')
  .controller('ViewCtrl', ['$scope', function ($scope) {
  
    var BASEFILENAME = "image/Slide",
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
            $scope.setSlide(current);
            $scope.channel = "view_channel";
            // subscribe and wait for slide number...
            $scope.pubnub.subscribe({
            channel: $scope.channel,
            message: function(m) {
                handleMessage(m);
            }
            });
    };
      
    function handleMessage(m) {
        var toSlide = parseInt(m);
        $scope.$apply(function(){
            $scope.setSlide(toSlide);
        });
    }
      
    $scope.nextSlide = function() {
        $scope.setSlide(++current);
    };
    
    $scope.prevSlide = function() {
        $scope.setSlide(--current);
    };
      
    $scope.setSlide = function(slideNumber) {
        current = slideNumber;
        $scope.viewingSlide = $scope.slides[current];
    };
    

    $scope.init();
    
  }]);
