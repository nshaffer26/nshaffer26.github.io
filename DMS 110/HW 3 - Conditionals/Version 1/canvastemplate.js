///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////


var x,x1,y,y1;
var xsp,ysp;

var cr,cSize,cEnd;
var csp;

var locX1; //1=top, 2=right, 3=bottom, 4=left

var r,g,b;


//SETUP FUNCTION : EXECUTED ONLY ONCE
function setup() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	//Line Initial
	x = cv.width / 2;
	y = cv.height / 2;
	x1 = cv.width / 2;
	y1 = 0;

	locX1 = 1; //At top initially

	xsp = 20;
	ysp = -20;

	//Circle Initial
	cr = 50;
	cSize = 1;
	cEnd = 1.5;
	csp = 0.015625;

	r = Math.floor(Math.random() * 255);
	g = Math.floor(Math.random() * 255);
	b = Math.floor(Math.random() * 255);
}

//DRAW FUNCTION : EXECUTED REPEATEDLY - UNTIL YOU QUIT THE PROGRAM
function draw() {
	//ctx.fillStyle = "rgb(255,255,255)";
	//ctx.fillRect(0,0,cv.width,cv.height);
	//Line
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x1,y1);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
	ctx.stroke();

	//Circle
	ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
	ctx.lineWidth = 0.25;
	ctx.beginPath();
	ctx.arc(x,y,cr,Math.PI*1.5,Math.PI*cEnd);
	ctx.stroke();

	cEnd = cEnd + csp;

	//Line Location
	if(locX1 == 1) {
		if(x1 >= cv.width && y1 <= 0) {
			locX1 = 2;
			ysp = ysp * -1;
		}
		else {
			x1 = x1 + xsp;
		}
	}
	if(locX1 == 2) {
		if(y1 >= cv.height && x1 >= cv.width) {
			locX1 = 3;
			xsp = xsp * -1;
		}
		else {
			y1 = y1 + ysp;
		}
	}
	if(locX1 == 3) {
		if(x1 <= 0 && y1 >= cv.height) {
			locX1 = 4;
			ysp = ysp * -1;
		}
		else {
			x1 = x1 + xsp;
		}
	}
	if(locX1 == 4) {
		if(y1 <= 0 && x1 <= 0) {
			locX1 = 1;
			xsp = xsp * -1;
		}
		else {
			y1 = y1 + ysp;
		}
	}

	//Line Color and Circle Radius
	if(x1 == cv.width / 2 && y1 == 0) {
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
		
		cEnd = 1.5;
	}
	cr = cr + cSize;

	//Circle Radius
	if(cr >= cv.width/2 || cr <= 0) {
		cSize = cSize * -1;
	}
}


///////////////////////////////////////////
/*executing code setup from here*/
setup();
setInterval(draw, 25);
/*to here executing code setup*/
///////////////////////////////////////////