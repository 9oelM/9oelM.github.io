---
title: "Ajax, animation while loading, and jQuery animation"
date: "2018-04-25T09:00:00.009Z"
category: "development"
---
## Ajax
Asynchronous JavaScript and XML.

`$.getJSON()` is a simpler version of `$.ajax()`.

### Loading a local JSON file with ajax
```javascript
$.getJSON("test.json", function(json) {
    // do something with json
    // json is the response object
    // json.data is the actual array
})
.done(function(){
    // you know what to do. 
})
.fail(function(){
    
})
.always(function(){
    
}));
```

### The other way
```javascript
$.ajax(
    dataType: 'json',
    url: url,
    data: data,
    success: function sucess(data){
                console.log(data)
            }, 
    error: ...
    // more options at https://www.sitepoint.com/use-jquerys-ajax-function/
)
```

or 

```javascript
$.get(url, data, success, dataType) // equivalent to above $.ajax call
```

## Setting up a loading page 
First, know that `window.load` event fires when:
> [The load event is sent to an element when it and all sub-elements have been completely loaded.](https://api.jquery.com/load-event/)

So do something like:
```javascript
window.load = function(){
    $("#loading-screen").fadeOut(1000);
}
```
to first show the loading screen and then to remove it when the load is completely finished. 

## [jQuery animation example](http://api.jquery.com/animate/)
```javascript
$( "#clickme" ).click(function() {
  $( "#book" ).animate({
    opacity: 0.25,
    left: "+=50",
    height: "toggle"
  }, 5000, function() {
    // Animation complete.
  });
});
```
