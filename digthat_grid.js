/**
 * Created by torypeterschild on 12/4/15.
 */

$(document).ready(function() {
    var canvas = $("#myCanvas").get(0);
    var context = canvas.getContext("2d");
    var startAngle = 0.25;
    var endAngle = 1.75;
    var gapClosing = true;
    var posX = 0;
    var posY = 75;

    function renderGrid(gridPixelSize, color)
    {
        context.save();
        context.lineWidth = 0.5;
        context.strokeStyle = color;

        // horizontal grid lines
        for(var i = 0; i <= canvas.height; i = i + gridPixelSize)
        {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.closePath();
            context.stroke();
        }

        // vertical grid lines
        for(var j = 0; j <= canvas.width; j = j + gridPixelSize)
        {
            context.beginPath();
            context.moveTo(j, 0);
            context.lineTo(j, canvas.height);
            context.closePath();
            context.stroke();
        }

        context.restore();
    }

    function setAngle()
    {
        if (startAngle <= 0) gapClosing = true;
        else if (startAngle > 0.25) gapClosing = false;

        if (gapClosing) {
            startAngle = startAngle + 0.05;
            endAngle = endAngle - 0.05;
        }
        else {
            startAngle = startAngle - 0.05;
            endAngle = endAngle + 0.05;
        }
    }

    function renderContent()
    {
        context.save();
        //context.canvas.width  = window.innerWidth;
        //context.canvas.height = window.innerHeight;
        renderGrid(20, "red");
        //context.fillStyle = "#3ae7ff";
        //context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = "Yellow";
        context.strokeStyle = "Yellow";
        context.arc(posX, posY, 50, startAngle * Math.PI, endAngle * Math.PI);
        context.lineTo(posX, posY)
        context.stroke();
        context.fill();
        context.restore();
    }

    function animationLoop()
    {
        canvas.width = canvas.width;
        renderContent();
        setAngle();
        posX += 5;
        if (posX > 500)
            posX = 0;
        setTimeout(animationLoop, 33);
    }

    animationLoop();
});