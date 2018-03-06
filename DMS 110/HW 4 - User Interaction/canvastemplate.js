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

//var undo = [];

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
	ctx.fillRect(5,5,85,40);

	//ctx.fillRect(95,5,85,40);
	
	if(rad == 35) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(95,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(95,5,85,40);
	}
	if(rad == 5) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(185,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(185,5,85,40);
	}

	if(bB) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-90,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-90,5,85,40);
	}

	if(bG) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-180,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-180,5,85,40);
	}

	if(bY) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-270,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-270,5,85,40);
	}

	if(bR) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-360,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-360,5,85,40);
	}

	if(bBlack) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-450,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-450,5,85,40);
	}

	if(bErase) {
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.fillRect(cv.width-540,5,85,40);
	}
	else {
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(cv.width-540,5,85,40);
	}
	
	//Button Labels
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.font = "30px Arial";
	//Clear
	ctx.fillText("Clear",10,35,90);
	//Erase
	ctx.fillText("Erase",cv.width-535,35,75);
	//Undo
	//ctx.fillRect(122.5,24,30,2);
	//ctx.moveTo(122.5,25);
	//ctx.lineTo(130.5,15);
	//ctx.lineTo(130.5,35);
	//Increment
	ctx.fillRect(122.5,24,30,2);
	ctx.fillRect(136.5,10,2,30);
	//Decrement
	ctx.fillRect(212.5,24,30,2);
	//Black Pen
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(cv.width-445,10,75,30);
	//Red Pen
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.fillRect(cv.width-355,10,75,30);
	//Yellow Pen
	ctx.fillStyle = "rgb(255,255,0)";
	ctx.fillRect(cv.width-265,10,75,30);
	//Green Pen
	ctx.fillStyle = "rgb(0,255,0)";
	ctx.fillRect(cv.width-175,10,75,30);
	//Blue Pen
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(cv.width-85,10,75,30);
}

/*Event Functions*/
function mouseDown() {
	mousePressed = true;
	//undo[0] = rad;
	if(mouseY < 50 && mouseY > 5 && mouseY < 45) {
		if(mouseX > 5 && mouseX < 90) {
			//Clear
			clear();
		}
		/*else if(mouseX > 95 && mouseX < 180) {
			//Undo
			for(var i = 1; i < undo.length; i+=2) {
				var ra = undo[0];

				ctx.fillStyle = "rgb(255,255,255)";
				ctx.beginPath();
				ctx.arc(undo[i],undo[i+1],ra+1,0,Math.PI*2);
				ctx.fill();
			}
			undo = [];
		}*/
		else if(mouseX > 95 && mouseX < 180) {
			//Increment Pen Size
			if(rad >= 5 && rad < 35) {
				rad = rad + 5;
			}
		}
		else if(mouseX > 185 && mouseX < 270) {
			//Decrement Pen Size
			if(rad > 5 && rad <= 35) {
				rad = rad - 5;
			}
		}
		else if(mouseX > cv.width-90 && mouseX < cv.width-90 + 85) {
			//Blue Pen
			bErase = bBlack = bR = bY = bG = false;
			bB = true;
			r = 0;
			g = 0;
			b = 255;
		}
		else if(mouseX > cv.width-180 && mouseX < cv.width-180 + 85) {
			//Green Pen
			bErase = bBlack = bR = bY = bB = false;
			bG = true;
			r = 0;
			g = 255;
			b = 0;
		}
		else if(mouseX > cv.width-270 && mouseX < cv.width-270 + 85) {
			//Yellow Pen
			bErase = bBlack = bR = bG = bB = false;
			bY = true;
			r = 255;
			g = 255;
			b = 0;
		}
		else if(mouseX > cv.width-360 && mouseX < cv.width-360 + 85) {
			//Red Pen
			bErase = bBlack = bY = bG = bB = false;
			bR = true;
			r = 255;
			g = 0;
			b = 0;
		}
		else if(mouseX > cv.width-450 && mouseX < cv.width-450 + 85) {
			//Black Pen
			bErase = bR = bY = bG = bB = false;
			bBlack = true;
			r = 0;
			g = 0;
			b = 0;
		}
		else if(mouseX > cv.width-540 && mouseX < cv.width-540 + 85) {
			//Eraser
			bBlack = bR = bY = bG = bB = false;
			bErase = true;
			r = 255;
			g = 255;
			b = 255;
		}
	}
	else {
		//undo = [];
		//undo[0] = rad;
		//undo[undo.length] = mouseX;
		//undo[undo.length] = mouseY;
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
		//undo[undo.length] = mouseX;
		//undo[undo.length] = mouseY;
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
setInterval(draw, 5);