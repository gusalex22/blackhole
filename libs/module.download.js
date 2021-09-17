var https = require("https");
    
var dowloadImage = function (data, callback) {
    if(!data.url){
        return callback(new Error("Insert image url in data.utl"));
    }else{
        console.log("Start :", data.url);
    }
    
    var client = https;
    client.request(data.url, function(response) {
        var body = "";
  
        response.on("data", function(d) {
            body += d;
        });
        
        response.on("end", function(d) {
            console.log("Finish :", data.url, " => size :", body.length);
            return callback(null, body);
        });
    
    }).on("error", function(err) {
        console.error("Error :", err.message);
    }).end();
};

module.exports = dowloadImage;