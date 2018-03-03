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
var r,g,b;
var color;
var rad;
var mousePressed = false;
var bErase,bBlack,bR,bY,bG,bB;

function setup() {
	ctx.canvas.width  = window.innerWidth; 
	ctx.canvas.height = window.innerHeight;
	r = 0;
	g = 0;
	b = 0;
	rad = 15;
	bErase = bR = bY = bG = bB = false;
	bBlack = true;
}

function draw() {
	ctx.fillStyle = "rgb(150,150,150)";
	ctx.fillRect(0,0,cv.width,50);

	//Buttons
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(5,5,100,40);
	
	if(rad == 35) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(110,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(110,5,100,40);
	}
	if(rad == 5) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(215,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(215,5,100,40);
	}

	if(bB) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-105,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-105,5,100,40);
	}

	if(bG) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-210,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-210,5,100,40);
	}

	if(bY) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-315,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-315,5,100,40);
	}

	if(bR) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-420,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-420,5,100,40);
	}

	if(bBlack) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-525,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-525,5,100,40);
	}

	if(bErase) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-630,5,100,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-630,5,100,40);
	}
	
	//Button Labels
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.font = "30px Arial";
	//Clear
	ctx.fillText("Clear",10,35);
	//Erase
	ctx.fillText("Erase",cv.width-620,35);
	//Increment
	ctx.fillRect(145,24,30,2);
	ctx.fillRect(159,10,2,30);
	//Decrement
	ctx.fillRect(250,24,30,2);
	//Black Pen
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(cv.width-520,10,90,30);
	//Red Pen
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.fillRect(cv.width-415,10,90,30);
	//Yellow Pen
	ctx.fillStyle = "rgb(255,255,0)";
	ctx.fillRect(cv.width-310,10,90,30);
	//Green Pen
	ctx.fillStyle = "rgb(0,255,0)";
	ctx.fillRect(cv.width-205,10,90,30);
	//Blue Pen
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(cv.width-100,10,90,30);
}

/*Event Functions*/
function mouseDown() {
	mousePressed = true;
	if(mouseY < 50 && mouseY > 5 && mouseY < 45) {
		if(mouseX > 5 && mouseX < 105) {
			//Erase
			clear();
		}
		else if(mouseX > 110 && mouseX < 210) {
			//Increment Pen Size
			if(rad >= 5 && rad < 35) {
				rad = rad + 5;
			}
		}
		else if(mouseX > 215 && mouseX < 315) {
			//Decrement Pen Size
			if(rad > 5 && rad <= 35) {
				rad = rad - 5;
			}
		}
		else if(mouseX > cv.width-105 && mouseX < cv.width-125 + 100) {
			//Blue Pen
			bErase = bBlack = bR = bY = bG = false;
			bB = true;
			r = 0;
			g = 0;
			b = 255;
		}
		else if(mouseX > cv.width-210 && mouseX < cv.width-210 + 100) {
			//Green Pen
			bErase = bBlack = bR = bY = bB = false;
			bG = true;
			r = 0;
			g = 255;
			b = 0;
		}
		else if(mouseX > cv.width-315 && mouseX < cv.width-315 + 100) {
			//Yellow Pen
			bErase = bBlack = bR = bG = bB = false;
			bY = true;
			r = 255;
			g = 255;
			b = 0;
		}
		else if(mouseX > cv.width-420 && mouseX < cv.width-420 + 100) {
			//Red Pen
			bErase = bBlack = bY = bG = bB = false;
			bR = true;
			r = 255;
			g = 0;
			b = 0;
		}
		else if(mouseX > cv.width-525 && mouseX < cv.width-525 + 100) {
			//Black Pen
			bErase = bR = bY = bG = bB = false;
			bBlack = true;
			r = 0;
			g = 0;
			b = 0;
		}
		else if(mouseX > cv.width-630 && mouseX < cv.width-630 + 100) {
			//Eraser
			bBlack = bR = bY = bG = bB = false;
			bErase = true;
			r = 255;
			g = 255;
			b = 255;
		}
	}
	else {
		color = "rgb(" + r + "," + g + "," + b + ")";
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(mouseX,mouseY,rad,0,Math.PI*2);
		ctx.fill();
	}
}

function mouseUp() {
	mousePressed = false;
}

function mouseMove(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
	if(mousePressed == true) {
		color = "rgb(" + r + "," + g + "," + b + ")";
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(mouseX,mouseY,rad,0,Math.PI*2);
		ctx.fill();
	}
}

function mouseOut() {
	mousePressed = false;
}

function clear() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,50,cv.width,cv.height-50);
}

//window.addEventListener("resize", setup);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mouseleave', mouseOut);
//canvas.addEventListener('mouseleave', mouseUp);
setup();
setInterval(draw, 10);