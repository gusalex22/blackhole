
var dowloadImage = require("./libs/module.download.js"),
    asynch = require("./libs/module.async.js"),
    config = require("./config.json");

var callbackFinal = function (error, result) {
    if(error){
        console.error("Error :", error);
    }else{
        console.log(result);
    }
};

asynch.map(config.images, dowloadImage, callbackFinal);