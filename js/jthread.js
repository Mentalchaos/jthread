/**
 *  jThread, libreria para trabajar con workers inline
 *  @author: Sebastian Real
 *  @version: 0.1
 **/
;(function( w ){

/**
 *  default error handler
 *
 **/
function defaultErrorHandler(e){
    alert('ERROR: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
}

/**
 *  Safari doesn`t have URL attr yet, instead it works with webkitURL
 *
 **/
function getUrl( w ){
    return ("URL" in w) ? w.URL : w.webkitURL;
}

function jThread( fn ){
    var bb, blobURL, workerBody;

    if(typeof fn !== "function"){
        throw new TypeError("You must send a function as an argument");
    }

    workerBody = [ 'addEventListener("message",' + fn.toString() + ',false);' ];
    bb = new Blob( workerBody, { type : "text/javascript" } );
    blobURL = getUrl(w).createObjectURL( bb );

    this.thread = new Worker( blobURL );
    this.thread.addEventListener("error", defaultErrorHandler, false);
}

jThread.prototype = {
    constructor: jThread,

    notify: function( fn ){
        this.thread.addEventListener( "message", fn, false );
    },

    handleError: function( fn ){
        this.thread.removeEventListener( "error", defaultErrorHandler, false );
        this.thread.addEventListener( "error", fn , false );
    },

    start: function(){
        //Firefox doesn't allow to send postMessage without args
        this.thread.postMessage( null );
    },

    sendData: function( data ){
        this.thread.postMessage( data );
    },

    kill: function(){
        this.thread.terminate();
    }
};

w.jThread = jThread;

})(window);
