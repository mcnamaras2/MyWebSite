// Declare Some Variables
// Polygon vertex pts
var origX0 = 0,  origY0 = 0;
var origX1 = 50, origY1 = 50;
var origX2 = 50, origY2 = 100;
var origX3 = 0, origY3 = 100;
var x0 = origX0, y0 = origY0;
var x1 = origX1, y1 = origY1;
var x2 = origX2, y2 = origY2;
var x3 = origX3, y3 = origY3;


var polygon = document.getElementById("polygon_color");
var background = document.getElementById("backgd_color");
var new_shape = document.getElementById("shape");

// Get Drawing object from html
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext('2d');

//Global default image
var image = "Polygon";

// Drawing Area
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canvasBkGndColor = "#EEEEEE"; // Red-Green-Blue color in hex RRGGBB, 00=Black, FF=White
var polygonColor = "skyblue";

//Circle and Semicircle
var radius = 70;

//Rectangle
var Z0 = 200;
var Z1 = 100;

//Scaling shape
slider_value = document.getElementById('slider_value'),
defaultval = 1.0,
MIN_SCALE = 1.0,
MAX_SCALE = 5.0;

//Rectangle translate position
var T1 = 0;
var T2 = 0;

// To Clear the Canvas of any drawing
function canvasClear(){
    context.fillStyle = canvasBkGndColor;
 context.rect(0 , 0, canvasWidth, canvasHeight);   // Make a drawing area, and call it context
    context.fill();  // clear drawing area so only background color
}

// To draw a polygon based on the values of vertex pts
function drawPolygon() {
  image = "Polygon";
  canvasClear();
context.beginPath();
context.moveTo(x0, y0);
context.lineTo(x1, y1);
context.lineTo(x2, y2);
context.lineTo(x3, y3);
context.closePath();
context.fillStyle = polygonColor;
context.fill();

}

// To draw a circle based on the values of transform and vertex pts
function drawCircle() {
      image = "Circle";
      canvasClear();
      context.beginPath();
      context.arc(T1, T2, radius, 0, 2 * Math.PI, false);
      context.fillStyle = polygonColor;
      context.fill();
}

// To draw a semicircle based on the values of transform and vertex pts
function drawSemicircle(){
      image = "Semicircle";
      canvasClear();
      context.beginPath();
      context.arc(T1, T2, radius, 0, Math.PI, false);
      context.closePath();
      context.fillStyle = polygonColor;
      context.fill();
}

// To draw a rectangle based on the values of transform and vertex pts
function drawRectangle(){
       image = "Rectangle";
      canvasClear();
      context.beginPath();
      context.beginPath();
      context.rect(T1, T2, Z0, Z1);
      context.fillStyle = polygonColor;
      context.fill();
}

// Reset polygon based on the original values of vertex pts
function resetPolygon() {
    x0 = origX0;
    y0 = origY0;
    x1 = origX1;
    y1 = origY1;
    x2 = origX2;
    y2 = origY2;
    x3 = origX3;
    y3 = origY3;
}


function resetCircle(){
  radius = 70;
}

function resetSemicircle(){
  radius = 70;
}

function resetRectangle(){
  Z0 = 200;
  Z1 = 100;
}

function drawScaleText(value) {
    var text = parseFloat(value).toFixed(2);
    var percent = parseFloat(value - MIN_SCALE) /parseFloat(MAX_SCALE - MIN_SCALE);
    scaleOutput.innerText = text;
    percent = percent < 0.35 ? 0.35 : percent;
    scaleOutput.style.fontSize = percent * MAX_SCALE / 1.5 + 'em';

}

function fillCircle(x, y, radius, fillColor) {
    context.fillStyle = fillColor;
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
 }

//event handler for scaling shape
slider_value.onchange = function(e) {
    defaultval = e.target.value;
    drawScaleText(defaultval);
    canvasClear();

   if (image == "Polygon"){
       resetPolygon();
        x0 = 0 - (defaultval*10);
        x1 = x1*defaultval;
        x2 = x2*defaultval;
        x3 = 0 - (defaultval*10);
        y0 = 0 - (defaultval*10);
        y1 = y1*defaultval;
        y2 = y2*defaultval;
        y3 = y3*defaultval;
        drawPolygon();

  }
  else if (image == "Circle"){
    resetCircle();
    radius = radius * defaultval;
    drawCircle();
  }
  else if (image =="Semicircle"){
    resetSemicircle();
    radius = radius * defaultval;
    drawSemicircle();

  }
  else if (image == "Rectangle"){
    resetRectangle();
    Z0 = Z0 * defaultval;
    Z1 = Z1 * defaultval;
    drawRectangle();
  }
  else {
     resetPolygon();
    x0 = 0 - (defaultval*10);
    x1 = x1*defaultval;
    x2 = x2*defaultval;
    x3 = 0 - (defaultval*10);
    y0 = 0 - (defaultval*10);
    y1 = y1*defaultval;
    y2 = y2*defaultval;
    y3 = y3*defaultval;
    drawPolygon();
  }

}

// event handler for shape selection
shape.onchange = function(event){

  var newShape = new_shape.options[new_shape.selectedIndex].value;

  canvasClear();
  if (newShape == "Circle"){
    //context.setTransform(1, 0, 0, 1, 0, 0);
    canvasClear();
    drawCircle();
  }
  else if(newShape == "Polygon"){
    //context.setTransform(1, 0, 0, 1, 0, 0);
    canvasClear();
     drawPolygon();
  }
  else if(newShape == "Rectangle"){
    //context.setTransform(1, 0, 0, 1, 0, 0);
      canvasClear();
     drawRectangle();
  }
  else if(newShape == "Semicircle"){
    //context.setTransform(1, 0, 0, 1, 0, 0);
    canvasClear();
    drawSemicircle();
  }
  else{

    canvasClear();
    drawPolygon();
  }

}

//event handler for polygon color selection
polygon_color.onchange = function(event){
    var newcolor = polygon.options[polygon.selectedIndex].value;
    polygonColor = newcolor;
    context.fillStyle = newcolor;
    context.fill();
}

//event handler for canvas background color selection
backgd_color.onchange = function(event){
var new_bckgd_color = background.options[background.selectedIndex].value;
canvasBkGndColor = new_bckgd_color;
context.fillStyle = canvasBkGndColor;
context.setTransform(1, 0, 0, 1, 0, 0);
context.rect(0 , 0, canvasWidth, canvasHeight);   // Make a drawing area, and call it context
context.fill();  // clear drawing area so only background color
drawPolygon();
}

canvas.onmouseup = function(e) {
            canvas.isDrawing = false;
 }

//event handler polygon translate with mouse click location and translate
canvas.onmousedown = function(e){

canvas.isDrawing = true;

var rect = canvas.getBoundingClientRect();
    var T1 = event.clientX - rect.left;
    var T2 = event.clientY - rect.top;


  context.setTransform(1, 0, 0, 1, 0, 0);
// get mouse X, Y position


canvasClear();
context.translate(T1, T2);

  if (image == "Polygon"){
    drawPolygon();

  }
  else if (image == "Circle"){
    drawCircle();
  }
  else if (image =="Semicircle"){
    drawSemicircle();

  }
  else if (image == "Rectangle"){

    drawRectangle();
  }
  else {
    drawPolygon();
  }

}
// Some Code to do immediately, prior to any events occurring
canvasClear();  // clear drawing area so only background color
drawPolygon(); // draw initial polygon
