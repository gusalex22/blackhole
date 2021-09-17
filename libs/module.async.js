
var Asynch = function(){
    var self = this;
    
    this.map = function (array, func, callback){
        var i = 0;
        var totalLenght = 0;
        var totalImage = 0;
        
        for (i = 0; i < array.length; i++) {
            func(array[i], function (error, result) {
                if(error){
                    callback(error, null);
                }else{
                    totalLenght += result.length;
                    totalImage++;
                }
            
                if(totalImage == array.length){
                    var locResutl = "All images are downloaded : number image(s) = " + totalImage + " / total size = " + totalLenght + " ko";
                    callback(null, locResutl);
                }            
            });
        }
    };
    
    this.waterfall = function(){
        //jobs => argument 0
        //data => argument 1
        //callback => argument 2 si data, sinon argument 1
        
        var jobs = arguments[0];
        var totalArgs = arguments.length;
        var callback;
        var args = [];
        
        if(totalArgs < 3){
            callback = arguments[1];
        }else{
            args.push(arguments[1]);
            callback = arguments[2];
        }
        
        var job = jobs.shift();
        
        var after = function(error, result) {
            if(error){
                callback(error, null);        
            }else if(jobs.length < 1){
                callback(null, result);
            }else{
                var locArgs = [];
                
                locArgs.push(jobs);
                if(result){
                    locArgs.push(result);
                }
                
                locArgs.push(function(error, result){
                    if(error){
                        callback(error, null);        
                    }else{
                        callback(null, result);
                    }
                });
        
                self.waterfall.apply(this, locArgs);
            }
        };
        
        args.push(after);
        job.apply(this, args);
    };    
};

module.exports = new Asynch();