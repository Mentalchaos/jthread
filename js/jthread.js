/**
 *  jThread, libreria para trabajar con workers inline
 *  @author: Sebastian Real
 *  @version: 0.1
 **/
;(function(w){

function jThread(fn){
    var bb, blobURL, innerCallback;

    innerCallback = ["self.onmessage = " + fn.toString() + ";"];
    bb = new Blob(innerCallback,{ type : "text/javascript" });
    blobURL = w.URL.createObjectURL(bb);
    this.thread = new Worker(blobURL);
}

jThread.prototype = {
    constructor: jThread,

    notify: function(fn){
        this.thread.addEventListener("message", fn);
    },

    start: function(){
        this.thread.postMessage();
    },

    sendData: function(data){
        this.thread.postMessage(data);
    },

    kill: function(){
        this.thread.terminate();
    }
};

w.jThread = jThread;

})(window);
