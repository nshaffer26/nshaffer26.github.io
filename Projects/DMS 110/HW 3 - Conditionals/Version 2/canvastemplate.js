///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////

//Center
var x,y;
var cr1 = 100;
var cSpeed = 1;
var r1,g1,b1;

//Cicles
var x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6;
var x1s,y1s,x2s,y2s,x3s,y3s,x4s,y4s,x5s,y5s,x6s,y6s;
var cr2 = 25;

var r,g,b;


//SETUP FUNCTION : EXECUTED ONLY ONCE
function setup() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	x = x1 = x2 = x3 = x4 = x5 = x6 = cv.width/2;
	y = y1 = y2 = y3 = y4 = y5 = y6 = cv.height/2;

	x1s = Math.floor(Math.random() * 10) + cSpeed;
	x1s = negate(x1s);
	x2s = Math.floor(Math.random() * 10) + cSpeed;
	x2s = negate(x2s);
	x3s = Math.floor(Math.random() * 10) + cSpeed;
	x3s = negate(x3s);
	x4s = Math.floor(Math.random() * 10) + cSpeed;
	x4s = negate(x4s);
	x5s = Math.floor(Math.random() * 10) + cSpeed;
	x5s = negate(x5s);
	x6s = Math.floor(Math.random() * 10) + cSpeed;
	x6s = negate(x6s);

	y1s = Math.floor(Math.random() * 10) + cSpeed;
	y1s = negate(y1s);
	y2s = Math.floor(Math.random() * 10) + cSpeed;
	y2s = negate(y2s);
	y3s = Math.floor(Math.random() * 10) + cSpeed;
	y3s = negate(y3s);
	y4s = Math.floor(Math.random() * 10) + cSpeed;
	y4s = negate(y4s);
	y5s = Math.floor(Math.random() * 10) + cSpeed;
	y5s = negate(y5s);
	y6s = Math.floor(Math.random() * 10) + cSpeed;
	y6s = negate(y6s);

	r = Math.floor(Math.random() * 255);
	g = Math.floor(Math.random() * 255);
	b = Math.floor(Math.random() * 255);
	r1 = b;
	g1 = g
	b1 = r;

}

//DRAW FUNCTION : EXECUTED REPEATEDLY - UNTIL YOU QUIT THE PROGRAM
function draw() {
	ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",0.1)";
	ctx.fillRect(0,0,cv.width,cv.height);

	//Circle
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(x,y,cr1,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	//Sub-Circles
	ctx.strokeStyle = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
	ctx.fillStyle = "rgba(" + r1 + "," + g1 + "," + b1 + ",0.5)";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(x1,y1,cr2,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(x2,y2,cr2,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(x3,y3,cr2,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(x4,y4,cr2,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(x5,y5,cr2,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(x6,y6,cr2,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();

	cr1 = cr1 + cSpeed;
	if(cr1 >= cv.height/2 || cr1 <= 100) {
		cSpeed = cSpeed * -1;
	}

	x1 = x1 + x1s;
	y1 = y1 + y1s;
	if(dist(x1,y1) >= cr1-cr2) {
		x1s = x1s * -1;
		y1s = y1s * -1;
		while(dist(x1,y1) >= cr1-cr2) {
			x1 = x1 + x1s;
			y1 = y1 + y1s;
		}
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
	x2 = x2 + x2s;
	y2 = y2 + y2s;
	if(dist(x2,y2) >= cr1-cr2) {
		x2s = x2s * -1;
		y2s = y2s * -1;
		while(dist(x2,y2) >= cr1-cr2) {
			x2 = x2 + x2s;
			y2 = y2 + y2s;
		}
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
	x3 = x3 + x3s;
	y3 = y3 + y3s;
	if(dist(x3,y3) >= cr1-cr2) {
		x3s = x3s * -1;
		y3s = y3s * -1;
		while(dist(x3,y3) >= cr1-cr2) {
			x3 = x3 + x3s;
			y3 = y3 + y3s;
		}
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
	x4 = x4 + x4s;
	y4 = y4 + y4s;
	if(dist(x4,y4) >= cr1-cr2) {
		x4s = x4s * -1;
		y4s = y4s * -1;
		while(dist(x4,y4) >= cr1-cr2) {
			x4 = x4 + x4s;
			y4 = y4 + y4s;
		}
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
	x5 = x5 + x5s;
	y5 = y5 + y5s;
	if(dist(x5,y5) >= cr1-cr2) {
		x5s = x5s * -1;
		y5s = y5s * -1;
		while(dist(x5,y5) >= cr1-cr2) {
			x5 = x5 + x5s;
			y5 = y5 + y5s;
		}
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
	x6 = x6 + x6s;
	y6 = y6 + y6s;
	if(dist(x6,y6) >= cr1-cr2) {
		x6s = x6s * -1;
		y6s = y6s * -1;
		while(dist(x6,y6) >= cr1-cr2) {
			x6 = x6 + x6s;
			y6 = y6 + y6s;
		}
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
}

function dist(cx,cy) {
	return Math.sqrt( (Math.pow((x-cx),2)) + (Math.pow((y-cy),2)) );
}

function negate(sp) {
	if((Math.floor(Math.random() * 10)) % 2 == 0) {
		sp = sp * -1;
	}
	return sp;
}


///////////////////////////////////////////
/*executing code setup from here*/
setup();
setInterval(draw, 25);
/*to here executing code setup*/
///////////////////////////////////////////