///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////

var s;
var numR,numC;
var w,h;

var count = 0;
var r,g,b;
var delay = 120;

//SETUP FUNCTION : EXECUTED ONLY ONCE
function setup() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	s = 60;

	numR = Math.floor(cv.width/70);
	numC = Math.floor(cv.height/70);
	if(numR % 2 != 0) {
		numR = numR - 1;
	}
	if(numC % 2 != 0) {
		numC = numC - 1;
	}

	w = (cv.width-(numR*s))/(numR-1);
	h = (cv.height-(numC*s))/(numC-1);
	console.log(w);
	console.log(h);
}

//DRAW FUNCTION : EXECUTED REPEATEDLY - UNTIL YOU QUIT THE PROGRAM
function draw() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);

	for(var i = 0; i < cv.width-w; i += (s+w)) {
		for(var j = 0; j < cv.height-h; j += (s+h)) {
			ctx.beginPath();
			ctx.rect(i,j,s,s);
			color(count);
		}
	}
	for(var i = s+(w-(w/2)); i < cv.width; i += s*2+w*2) {
		for(var j = s+(h-(h/2)); j < cv.height; j += s*2+h*2) {
			ctx.beginPath();
			ctx.arc(i,j,s,0,Math.PI*2);
			color(count);
		}
	}
	count++;
}

function color(count) {
	r = Math.floor(Math.random()*255);
	g = Math.floor(Math.random()*255);
	b = Math.floor(Math.random()*255);
	if(count % delay >= 0 && count % delay < delay/4) {
		ctx.fillStyle = "rgb(" + r + ",0,0)";
 		ctx.fill();
 		ctx.stroke();
 	}
 	else if(count % delay >= delay/4 && count % delay < (delay/4)*2) {
		ctx.fillStyle = "rgb(0," + g + ",0)";
 		ctx.fill();
 		ctx.stroke();
 	}
 	else if(count % delay >= (delay/4)*2 && count % delay < (delay/4)*3) {
		ctx.fillStyle = "rgb(0,0," + b + ")";
 		ctx.fill();
 		ctx.stroke();
 	}

 	else {
 		ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
 		ctx.fill();
 		ctx.stroke();
 	}
}

///////////////////////////////////////////
/*executing code setup from here*/
setup();
setInterval(draw, 100);
/*to here executing code setup*/
///////////////////////////////////////////