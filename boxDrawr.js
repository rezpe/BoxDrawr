function createBoxDrawr(width, height) {

    $canvas = $(document.createElement("canvas"))
    $canvas.attr({
        width: width,
        height: height
    }).css({
        border: "black 1px solid",
        width: width + "px",
        height: height + "px"
    })

    //Draw the Shape
    $canvas.bind('mousedown', function(evt) {
        $(this).data("start", true)
            //Add the points to the list
        $(this).data("box", {
                x0: evt.pageX - $(this).offset().left,
                y0: evt.pageY - $(this).offset().top,
                x1: evt.pageX - $(this).offset().left,
                y1: evt.pageY - $(this).offset().top
            })
            //Trigger beginpath event
        $(this).trigger("beginbox", [evt.pageX - $(this).offset().left, evt.pageY - $(this).offset().top])

    })

    $canvas.bind('mousemove', function(evt) {
        if ($(this).data("start") == true) {

            var oldBox = $(this).data("box")

            oldBox.x1 = evt.pageX - $(this).offset().left
            oldBox.y1 = evt.pageY - $(this).offset().top

            var ctx = $(this)[0].getContext("2d")

	    ctx.clearRect(0, 0, parseInt($(this).attr("width")), parseInt($(this).attr("height")));
	    ctx.beginPath();
            ctx.rect(Math.min(oldBox.x0,oldBox.x1),
                     Math.min(oldBox.y0,oldBox.y1),
                     Math.abs(oldBox.x0-oldBox.x1),
                     Math.abs(oldBox.y0-oldBox.y1));
            ctx.stroke();

            //Update rect
            $(this).data("box",oldBox)
                //Trigger drawing event
            $(this).trigger("drawing", [evt.pageX - $(this).offset().left, evt.pageY - $(this).offset().top])
        }
    })

    $canvas.bind('mouseup', function(evt) {
        if ($(this).data("start") == true) {
            var oldBox = $(this).data("box")
            oldBox.x1 = evt.pageX - $(this).offset().left
            oldBox.y1 = evt.pageY - $(this).offset().top
            $(this).data("start", false)
            var ctx = $(this)[0].getContext("2d")
	    ctx.clearRect(0, 0, parseInt($(this).attr("width")), parseInt($(this).attr("height")));
            //Add the points to the list
            $(this).data("box",oldBox)
                //Trigger drawing event
            $(this).trigger("endbox", [evt.pageX - $(this).offset().left, evt.pageY - $(this).offset().top])
        }
    })

    return $canvas
}
