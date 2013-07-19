jthread
=======

Library to work with web workers more easy

Contents
-----
* [Creating a Thread](#creating-a-thread)
* [Receiving data](#receiving-data)
* [Starting the Thread](#starting-the-thread)
* [Handle errors](#handle-errors)

##Creating a Thread

working with jThread is easy as

```javascript
var myThread = new jThread(function(e){
  var i = 0;

  for(;i < 10; i++){
    this.postMessage("We are sending this number : " + i);
  }
  
});
```

Now, to explain each section of this code we can separate in different sections:

1.- to create a new instance of our thread:
```javascript
var myThread = new jThread(function(e){
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

##Handle errors

in construction .....
