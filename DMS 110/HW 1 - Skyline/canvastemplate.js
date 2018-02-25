///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////






//SETUP FUNCTION : EXECUTED ONLY ONCE
function setup() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}

//DRAW FUNCTION : EXECUTED REPEATEDLY - UNTIL YOU QUIT THE PROGRAM
function draw() {
	//TOTAL WIDTH: 1280
	ctx.fillStyle = "rgb(30,30,70)";
	ctx.fillRect(0,0,cv.width,cv.height);

	//Moon
	ctx.fillStyle = "rgb(235,235,255)";
	ctx.beginPath();
	ctx.arc(cv.width/2,cv.height,(cv.width/2)-75,0,2*Math.PI);
	ctx.fill();

	//------Background------//
	ctx.fillStyle = "rgb(140,140,170)";
	ctx.fillRect(60,400,75,cv.height);
	ctx.fillRect(500,425,55,cv.height);
	ctx.fillRect(660,200,100,cv.height);
	ctx.fillRect(800,300,100,cv.height);
	ctx.fillRect(1200,350,100,cv.height);

	//------Middleground------//
	ctx.fillStyle = "rgb(80,80,110)";
	ctx.fillRect(200,450,100,cv.height);
	ctx.fillRect(375,325,90,cv.height);

	ctx.fillRect(580,300,100,cv.height);
	ctx.beginPath();
	ctx.moveTo(680,250);
	ctx.lineTo(680,300);
	ctx.lineTo(580,300);
	ctx.fill()

	ctx.fillRect(680,400,50,cv.height);
	ctx.fillRect(850,500,100,cv.height);
	ctx.fillRect(1080,450,25,cv.height);

	//------Foreground------//
	ctx.fillStyle = "rgb(20,20,30)";
	ctx.fillRect(0,600,100,cv.height);
	ctx.fillRect(100,525,140,cv.height);
	ctx.fillRect(240,650,50,cv.height);

	ctx.fillRect(290,400,150,cv.height);
	ctx.beginPath();
	ctx.moveTo(290,350);
	ctx.lineTo(290,400);
	ctx.lineTo(440,400);
	ctx.fill()
	
	ctx.fillRect(440,550,100,cv.height);
	ctx.fillRect(540,450,80,cv.height);
	ctx.fillRect(620,600,40,cv.height);
	ctx.fillRect(660,550,150,cv.height);
	ctx.fillRect(810,650,70,cv.height);
	ctx.fillRect(880,600,100,cv.height);

	ctx.fillRect(980,375,100,cv.height);
	ctx.beginPath();
	ctx.moveTo(1030,335);
	ctx.lineTo(1030,375);
	ctx.lineTo(1080,375);
	ctx.fill()
	ctx.fillRect(980,325,50,cv.height);
	ctx.beginPath();
	ctx.moveTo(1030,265);
	ctx.lineTo(1030,325);
	ctx.lineTo(980,325);
	ctx.fill()
	
	ctx.fillRect(1080,525,60,cv.height);
	ctx.fillRect(1140,425,140,cv.height);
	ctx.fillRect(1280,500,100,cv.height);
	ctx.fillRect(1380,600,80,cv.height);
	ctx.fillRect(1460,400,cv.width,cv.height);


/*	//Cicle Example
	ctx.fillStyle = "rgb(255,255,0)";
	ctx.beginPath();
	ctx.arc(1100,100,50,0,2*Math.PI);
	ctx.fill();
*/
/*	//Rectangle Examples
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(245,400,50,50);
	ctx.fillRect(305,400,50,50);
	ctx.fillRect(245,460,50,50);
	ctx.fillRect(305,460,50,50);
*/
/*
	//Triangle Example
	ctx.fillStyle = "rgb(255,100,0)";
	ctx.beginPath();
	ctx.moveTo(300,250);
	ctx.lineTo(180,300);
	ctx.lineTo(420,300);
	ctx.closePath();			//<-- Line not needed
	ctx.stroke();				//<-- Line not needed, adds boarder?
	ctx.fill()
*/
}







///////////////////////////////////////////
/*executing code setup from here*/
setup();
setInterval(draw, 100);
/*to here executing code setup*/
///////////////////////////////////////////