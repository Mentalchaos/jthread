# jthread

Library to work with web workers without other js file

Contents
-----
* [Creating a Thread](#creating-a-thread)
* [Receiving data](#receiving-data)
* [Starting the Thread](#starting-the-thread)
* [Handle errors](#handle-errors)
* [Finishing a Thread](#finishing-a-thread)


##Creating a Thread

working with jThread is easy as

```javascript
var myThread = jthread(function(e){
  var i = 0;

  for(;i < 10; i++){
    this.postMessage("We are sending this number : " + i);
  }

});
```

Now, to explain each section of this code we can separate in different sections:

1.- to create a new instance of our thread:
```javascript
var myThread = jthread(function(e){
  //..... rest of code to process data and blablabla....
});
```
This will make a new worker to work with, it'll receive a function as an argument, this function is the body
of our what will do that job.
The e as an arg of our function represents the Event instance we are receiving from the client.

2.- to callback our response to browser we use postMessage method, it will send our response back to read it and do whatever we want.


##Receiving data

To continue our implementacion of thread, we must implement a callback method who advice us that the job is done.

```javascript
myThread.notify(function(e){
  alert("Yay!, we're getting this data from worker : " + e.data);
});
```

This will notify our client that our request is done and it sends us a response in Event


##Starting thre Thread

Starting our worker is easy as :
we could send initial data as an argument to start method or send it empty

````javascript
myThread.send(); //starting the worker without data associated to it
myThread.send({ action : "code it", times : 10 }); //starting the worker with data associated to it
````

To send next times additional data we can use send method:
````javascript
myThread.send({ message: "javascript is cool" });
````


##Handle errors

jThread has a default error handler to handle errors, but if is needed, this error handler can be overwritten this way

````javascript
myThread.handleError(function(e){
    e.lineno // it will show line number where our worker is failing
    e.filename // it will show filename of our failing worker
    e.message // it will show custom message to describe error
});
````


##Finishing a Thread
To terminate thread working process we can do inline our function like this
````javascript
var myThread = jthread(function(e){
  var i = 0;

  for(;i < 10; i++){
    if(i == 5){
        this.close();
    }

    this.postMessage("We are sending this number : " + i);
  }

});
````

or we can kill outside of Thread definition
````javascript
myThread.kill(); // this will kill our worker, and free resources associated to it
````
