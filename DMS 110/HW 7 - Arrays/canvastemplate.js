///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////

var x = [];
var y = [];
var radius = [];
var spX = [];
var spY = [];
var lng = 40;

var r = [];
var g = [];
var b = [];
var color = [];
var currentColor = "rgba(0,0,0,0.5)";

//SETUP FUNCTION : EXECUTED ONLY ONCE
function setup() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	for(var i = 0; i < lng; ++i) {
		x[i] = cv.width/2;
		y[i] = cv.height/2;
		radius[i] = Math.random()*30 + 10;
		spX[i] = Math.random()*30 - 15;
		spY[i] = Math.random()*30 - 15;

		if(i == 9) {
			r[i] = 255;
			g[i] = 0;
			b[i] = 0;
			radius[i] = 20;
			spX[i] = Math.random()*10 - 5;
			spY[i] = Math.random()*10 - 5;
		}
		else if(i == 19) {
			r[i] = 0;
			g[i] = 255;
			b[i] = 0;
			radius[i] = 20;
			spX[i] = Math.random()*10 - 5;
			spY[i] = Math.random()*10 - 5;
		}
		else if(i == 29) {
			r[i] = 0;
			g[i] = 0;
			b[i] = 255;
			radius[i] = 20;
			spX[i] = Math.random()*10 - 5;
			spY[i] = Math.random()*10 - 5;
		}
		else if(i == 39) {
			r[i] = 0;
			g[i] = 0;
			b[i] = 0;
			radius[i] = 20;
			spX[i] = Math.random()*10 - 5;
			spY[i] = Math.random()*10 - 5;
		}
		else {
			r[i] = 255;
			g[i] = 255;
			b[i] = 255;
		}

		color[i] = "rgba(" + r[i] + "," + g[i] + "," + b[i] + ",0.5)";
	}
}

//DRAW FUNCTION : EXECUTED REPEATEDLY - UNTIL YOU QUIT THE PROGRAM
function draw() {
	background();
	for(var i = 0; i < lng; ++i) {
		if(i == 9 || i == 19 || i == 29 || i == 39) {
			ctx.beginPath();
			ctx.fillStyle = color[i];
			ctx.strokeStyle = "rgb(255,255,255)";
			ctx.lineWidth = 4;
			ctx.arc(x[i],y[i],radius[i],0,Math.PI*2);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}
		else {
			ctx.beginPath();
			ctx.fillStyle = color[i];
			ctx.arc(x[i],y[i],radius[i],0,Math.PI*2);
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.fillStyle = currentColor;
			ctx.arc(x[i],y[i],radius[i]/4,0,Math.PI*2);
			ctx.fill();
			ctx.closePath();
		}

		x[i] += spX[i];
		y[i] += spY[i];
		if(x[i] < 0+radius[i] || x[i] > cv.width-radius[i]) {
			if(i == 9) {
				currentColor = color[i];
			}
			else if(i == 19) {
				currentColor = color[i];
			}
			else if(i == 29) {
				currentColor = color[i];
			}
			else if(i == 39) {
				currentColor = color[i];
			}
			spX[i] *= -1;
		}
		if(y[i] < 0+radius[i] || y[i] > cv.height-radius[i]) {
			if(i == 9) {
				currentColor = color[i];
			}
			else if(i == 19) {
				currentColor = color[i];
			}
			else if(i == 29) {
				currentColor = color[i];
			}
			else if(i == 39) {
				currentColor = color[i];
			}
			spY[i] *= -1;
		}
	}
}

function background() {
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,cv.width,cv.height);
}






///////////////////////////////////////////
/*executing code setup from here*/
setup();
setInterval(draw, 30);
/*to here executing code setup*/
///////////////////////////////////////////