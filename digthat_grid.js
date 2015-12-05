/**
 * Created by torypeterschild on 12/4/15.
 */

$(document).ready(function() {
    var canvas = $("#myCanvas").get(0);
    var context = canvas.getContext("2d");

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
        context.arc(100,75,50,0.25*Math.PI,1.75*Math.PI);
        context.lineTo(100, 75);
        context.stroke();
        context.fill();
        context.restore();
    }

    renderContent();
});