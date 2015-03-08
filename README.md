## Summary

This library permits you to build a canvas where users can draw boxes

## How to use

You use function 'createBoxDrawr' to create a jquery object containing the canvas

```javascript
var $drawr = createBoxDrawr(600,600).appendTo("body")
```

Then you can set css and attr like in normal jquery objects

```javascript
$drawr.css({position:"absolute",left:0,top:0})
```

## Events

There are 3 events that are triggered

* *start*: When you start drawing (mouse Down)
* *drawing*: While you are drawing (mouse Move)
* *endbox*: When you end drawing (mouse Up)

For example:

```javascript
$drawr.bind("endpath",function(evt,x,y){
        points = $(this).data("box")
        createShape(points)
})
```

## Data

Using the key "box", one can access the objects with the points of the rectangle.

```javascript
// box is an object: {x0:int,y0:int,x1:int,y1:int}
var box = $(this).data("box")
```