var express = require('express');
var router = express.Router();

var BASEFILENAME = "content/Slide";
var pDatabase = [];
var filename = "";
var presentationId;

var init = function(){
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
        console.log("presentations initialized");
    }

init();

var getPresenation = function(){
        return pDatabase[presentationId];
    }
/* GET users listing. */
router.get('/presentation', function(req, res, next) {
    res.send(pDatabase[presentationId]);
});
router.get('/presentation/:id', function(req, res, next) {
    presentationId = parseInt(req.params.id);
    res.send("presentationId set to: "+presentationId);
    var str = "presentationId set to: "+presentationId.toString();
    console.log("presentation ID set to: ",presentationId);
});
router.get('/presentationList', function(req, res, next) {
    res.send(pDatabase);
});

module.exports = router;
