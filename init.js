
var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');

var container = document.getElementById("CanvasCol");
canvas.height = container.offsetHeight;
canvas.width = container.offsetWidth;

canvas.tabIndex = 0;
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

var PAD = 10;
var triangle = [[PAD, PAD], [canvas.width - PAD, PAD], [canvas.width / 2, canvas.height - PAD]];

var level = 2;
var turnCount = 0;
var optimal;

var tris;
var coords;
var shadePos;
var shaded;
var pointPos;
var point;




