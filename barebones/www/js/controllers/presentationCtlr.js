'use strict';

/**
* A factory to wrap pubnub   
*/

angular.module('barebonesApp')
    .controller('presentationCtlr', ['$rootScope', '$scope', '$window','$location', 'presentationService',function ($rootScope, $scope,$window, $location,presentations) {
    
    //define back for all controllers
    $rootScope.back = function() {
        $window.history.back();
    }
    var presentationList = [];
    presentations.presentationList().then(function(presList){
        presentationList = presList;
    },function(err){
        console.log("presentationCtlr: presentationList failed");
    });

    
    $scope.presentationList = function() {
        return presentationList;
    };
        
    $scope.setSelected = function(id){
        presentations.setPresentation(id).then(function(){
            $location.path('/slides');
        },function(err){
            console.log("presentationCtlr setSelected fails");
        });
    };

}]);
              
