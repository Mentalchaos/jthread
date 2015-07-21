/**
 *  jThread, it allows to work with workers in a easier way than it does.
 *  @author: Sebastian Real
 *  @version: 0.1
 **/
(function(global){
//Let's keep this commented until i see everything burning
//global.URL = global.URL || global.webkitURL;

/**
 *  default error handler
 *
 **/
function defaultErrorHandler(e){
  throw new Error( 'ERROR: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message );
}

function jthread( fn ) {
  var blob, workerBody, thread, blobURL, worker;

  if (typeof fn !== 'function') {
    throw new TypeError('You must send a function as an argument');
  }

  workerBody = [ 'addEventListener("message", ' + fn.toString() + ', false)' ];
  blob = new Blob(workerBody, {type: 'text/javascript'});
  blobURL = URL.createObjectURL( blob );
  worker = new Worker( blobURL );
  worker.addEventListener('error', defaultErrorHandler, false);

  thread = {
    notify: function( fn ){
      worker.addEventListener( 'message', fn, false );
      return this;
    },

    handleError: function( errorHandler ){
      worker.removeEventListener( 'error', defaultErrorHandler, false );
      worker.addEventListener( 'error', fn , false );
      return this;
    },

    send: function( data ){
      worker.postMessage( data );
      return this;
    },

    kill: function(){
      worker.terminate();
      URL.revokeObjectUrl( blobURL );
      return this;
    }
  };

  return thread;
}

global.jthread = jthread;

})(window);
