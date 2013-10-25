/**
 *  jThread, libreria para trabajar con workers inline
 *  @author: Sebastian Real
 *  @version: 0.1
 **/
(function(){
window.URL = window.URL || window.webkitURL;

/**
 *  default error handler
 *
 **/
function defaultErrorHandler(e){
    throw new Error('ERROR: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
}

function jThread( fn ){
    var bb, workerBody;

    if(typeof fn !== "function"){
        throw new TypeError("You must send a function as an argument");
    }

    workerBody = [ 'addEventListener("message",' + fn.toString() + ',false);' ];
    bb = new Blob( workerBody, { type : "text/javascript" } );

    this.blobURL = URL.createObjectURL( bb );
    this.thread = new Worker( this.blobURL );
    this.thread.addEventListener("error", defaultErrorHandler, false);

    return this;
}

jThread.prototype = {
    constructor: jThread,

    notify: function( fn ){
        this.thread.addEventListener( "message", fn, false );
        return this;
    },

    handleError: function( fn ){
        this.thread.removeEventListener( "error", defaultErrorHandler, false );
        this.thread.addEventListener( "error", fn , false );
        return this;
    },

    start: function( data ){
        //Firefox doesn't allow to send postMessage without args
        data = data || null;
        this.send( data );
        return this;
    },

    send: function( data ){
        this.thread.postMessage( data );
        return this;
    },

    kill: function(){
        this.thread.terminate();
        URL.revokeObjectUrl( this.blobURL );
        return this;
    }
};

this.jThread = jThread;

}).call(window);
