'use strict';

/**
* A factory to wrap pubnub   
*/

angular.module('barebonesApp')
    .service('presentationService', ['$http','baseUrl', function ($http,baseUrl) {
    var BASEFILENAME = "content/Slide";
    var pDatabase = [];
    var filename = "";
    var presentation={};
    var presentationId;
    var url = baseUrl;    
        
    this.presentationList = function() {
    url = baseUrl.endpoint+'/api/presentationList';
    var promise = $http.get(url).then(
        function(resp) {
            console.log('Success',resp);
            var presentationList = resp.data;
            return presentationList;
        });
    return promise;
    };    
        
    this.getPresentation = function() {
    url = baseUrl.endpoint+'/api/presentationList'; 
    var promise = $http.get(url).then(
        function(resp) {
            console.log('Success',resp);
            var presentation = resp.data;
            return presentation;
        });
    return promise;
    };  
        
    this.setPresentation = function(id) {
    var req = baseUrl.endpoint+'/api/presentation/'+id.toString();
    var promise = $http.get(req).then(
        function(resp) {
            console.log('Success',resp);
            var presentation = resp.data;
            return presentation;
        });
    return promise;
    }; 
        
/*        
    this.init = function(){
        presentationId=0;
        //presenetation 1    
        presentation = new Object();
        presentation.name = "PresentationOne";
        presentation.slides=[];
        for (var i = 1; i<9;i++){
            filename = BASEFILENAME+i.toString()+".png";
            presentation.slides.push({
                type : "img",
                source : filename
                });
            }
            presentation.slides.splice(5,0,{type:"video", source:"http://video-js.zencoder.com/oceans-clip.mp4", poster:"http://video-js.zencoder.com/oceans-clip.png"});
        pDatabase.push(presentation);

        presentation = new Object();
        presentation.name = "PresentationTwo";
        presentation.slides=[];
        for (var i = 10; i<18;i++){
            filename = BASEFILENAME+i.toString()+".png";
            presentation.slides.push({
                type : "img",
                source : filename
                });
            }
            presentation.slides.splice(4,0,{type:"video", source:"http://video-js.zencoder.com/oceans-clip.mp4",poster:"http://video-js.zencoder.com/oceans-clip.png"});
        pDatabase.push(presentation);
        
        presentation = new Object();
        presentation.name = "PresentationThree";
        presentation.slides=[];
        for (var i = 21; i<34;i++){
            filename = BASEFILENAME+i.toString()+".png";
            presentation.slides.push({
                type : "img",
                source : filename
                });
            }
            presentation.slides.splice(4,0,{type:"video", source:"http://video-js.zencoder.com/oceans-clip.mp4", poster:"http://video-js.zencoder.com/oceans-clip.png"});
        pDatabase.push(presentation);
    }
    
    this.presentationList = function() {
        return pDatabase;
    };
        
    this.setPresenation = function(id){
        presentationId = id;
    };
    this.getPresenation = function(){
        return pDatabase[presentationId];
    }
*/
    return this;
}]);
              
