'use strict';

/**
* vjs-show directive to interface with videojs library   
*/
angular.module('barebonesApp')
    .directive('vjsSize',['pnFactory', function (pnFactory) {
      return {
        restrict : 'A',
        link: function(scope, element, attrs) 
        {
            var vid = angular.element(element)[0];  
            var myPlayer = undefined;

            pnFactory.init();
            var channel = pnFactory.newChannel("vidActions");

            var doPlay = function(){
                if(myPlayer != undefined){
                    myPlayer.play();
                }
            };

            var doPause = function(){
                if(myPlayer != undefined){
                    myPlayer.pause();
                }      
            };
            
            var doSeek = function(time){
                if(myPlayer != undefined){
                    myPlayer.currentTime(time);
                }      
            };


            var handleAction = function(action){
                switch(action.command) {
                    case "play":
                        doPlay();
                        break;
                    case "pause":
                        doPause();
                        break;
                    case "seekTo":
                        doSeek(action.where);
                        break;            
                }
            };

 /*           vid.onloadeddata = function(){ */
            var onReady = function(){
                alert("onloadeddata fires!");                
                scope.height = vid.videoHeight;
                scope.width = vid.videoWidth;
    /*
                var str = "height =  "+vid.videoHeight.toString()+"width= "+vid.videoWidth.toString();
                alert(str);  
                str = "height =  "+myPlayer.height().toString()+"width= "+myPlayer.width().toString();
                alert(str);  
    */
                if(scope.height !==0 && scope.width !== 0 ){
                    var str = "height =  "+scope.height.toString()+"width= "+scope.width.toString();
                    alert(str);  
                    scope.aspect = (scope.height/scope.width)*100;
                    scope.padString = scope.aspect.toString();
                    scope.padString += "%";
                    vid.parentNode.style.paddingTop = scope.padString
                    if(myPlayer != undefined && attrs.vjsSize!="view_only") myPlayer.controls(true);
                }else{
                    //no player data so assume mobile
                    alert("goto fullscreen and play");  
                    myPlayer.requestFullcreen();
                    if(vjsSize!="view_only"){
                        myPlayer.controls(true);
                    }
                    myPlayer.play();

                }
                scope.padString = scope.aspect.toString();
                scope.padString += "%";
                vid.parentNode.style.paddingTop = scope.padString
                if(myPlayer != undefined && attrs.vjsSize!="view_only") myPlayer.controls(true);
                console.log("w:",scope.width,"h:",scope.height, "a:",scope.aspect);               
            };

            attrs.$observe("src", function(srcAttribute) {
                alert("Attrs.$observe fires!");
                myPlayer = videojs("example_video_1",{},function(){
                    // Player (this) is initialized and ready.
                    var p = this;
                    if(attrs.vjsSize != "view_only"){
                        p.on("play",onPlay);
                        p.on("pause",onPause);
                        p.on("seeked",onSeeked);
                    }else {
                        channel.subscribe(handleAction);
                    }    
                    p.on("loadeddata",onReady);
                    p.load();
                });
            }); 

            // player callback functions    
            var onPlay = function() {
                channel.publish({command:"play"});
                console.log("play!");
            };

            var onPause = function() {
                channel.publish({command:"pause"});
                console.log("pause");
            }

            var onSeeked = function() {
                var time = myPlayer.currentTime();
                channel.publish({command:"seekTo", where : time})
                console.log("seeked");
            }
            scope.$on('$destroy',function() {
                if(myPlayer != undefined) myPlayer.dispose();
                if(attrs.vjsSize == "view_only") channel.unsubscribe();
            });
        }
        }; 
    }
]);