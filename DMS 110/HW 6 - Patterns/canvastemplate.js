///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////
//SETUP FUNCTION : EXECUTED ONLY ONCE

var mouseX, mouseY;
var keyPressed;
var pressedKey;
var sz = 50;
var xS = 30;
var index = 0;

var s;
var sC;
var numR,numC;
var w,h;

function setup() {
	ctx.canvas.width  = window.innerWidth; 
	ctx.canvas.height = window.innerHeight;

	s = 60;
	sC = 50;
}

function draw() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);
	
	if(index == 0) {
		var count = 0;

		numR = Math.floor(cv.width/70);
		numC = Math.floor(cv.height/70);

		if(numR % 2 == 0) {
			numR = numR - 1;
		}
		if(numC % 2 == 0) {
			numC = numC - 1;
		}

		w = (cv.width-(numR*s))/(numR-1);
		h = (cv.height-(numC*s))/(numC-1);

		for(var i = 0; i < cv.width-w; i += (s+w)) {
			for(var j = 0; j < cv.height-h; j += (s+h)) {
				if(count % 2 == 0) {
					ctx.strokeStyle = "rgb(0,0,0)";
				}
				else {
					r = Math.floor(Math.random()*255);
					g = Math.floor(Math.random()*255);
					b = Math.floor(Math.random()*255);
					ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
				}
				ctx.beginPath();
				ctx.rect(i,j,s,s);
				ctx.lineWidth = 5;
				ctx.stroke();
			}
			count++;
		}
	}
	else if(index == 1) {
		var count = 0;

		numR = Math.floor(cv.width/40);
		numC = Math.floor(cv.height/40);

		if(numR % 2 != 0) {
			numR = numR - 1;
		}
		if(numC % 2 != 0) {
			numC = numC - 1;
		}

		w = (cv.width-(numR*sC))/(numR-1);
		h = (cv.height-(numC*sC))/(numC-1);

		for(var i = sC+(w-(w/2)); i < cv.width; i += sC*2+w*2) {
			for(var j = sC+(h-(h/2)); j < cv.height; j += sC*2+h*2) {
				if(count % 2 == 0) {
					ctx.fillStyle = "rgb(0,0,255)";
				}
				else {
					ctx.fillStyle = "rgb(0,255,255)";
				}
				ctx.beginPath();
				ctx.arc(i,j,sC,0,Math.PI*2);
				ctx.fill();
				ctx.stroke();
			}
			count++;
		}
	}
	else {
		var count = 0;
		for(var i = 0; i < cv.width; i += sz) {
			for(var j = 0; j < cv.height; j += sz) {
				if(count % 2 == 0) {
					ctx.strokeStyle = "rgb(0,0,255)";
				}
				else {
					ctx.strokeStyle = "rgb(0,255,0)";
				}
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.moveTo(i,j);
				ctx.lineTo(i+sz,j+sz);
				ctx.moveTo(i,j+xS);
				ctx.lineTo(i+sz,j);
				ctx.stroke();
			}
			count++;
		}
	}
}

/*Event Functions*/
function mouseDown() {
	index++;
	if(index > 2) {
		index = 0;
	}
}

function mouseUp() {
}

function mouseMove(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
}

window.addEventListener("resize", setup);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);
//canvas.addEventListener('mouseleave', mouseUp);
setup();
setInterval(draw, 30);