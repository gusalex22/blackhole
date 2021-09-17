
var dowloadImage = require("./libs/module.download.js"),
    //asynch = require("./libs/module.async.js"),
    async = require("async-gusalex"),
    config = require("./config.json");

var callbackFinal = function (error, result) {
    if(error){
        console.error("Error :", error);
    }else{
        console.log(result);
    }
};

async.map(config.images, dowloadImage, callbackFinal);