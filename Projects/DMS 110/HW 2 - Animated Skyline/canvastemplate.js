///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////


var cloudPos = -1250;
var count1 = 0;
var count2 = 10;
var count3 = 40;


//SETUP FUNCTION : EXECUTED ONLY ONCE
function setup() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}

//DRAW FUNCTION : EXECUTED REPEATEDLY - UNTIL YOU QUIT THE PROGRAM
function draw() {
	//TOTAL WIDTH: 1280
	ctx.fillStyle = "rgb(30,30,70)";
	ctx.globalAlpha = 1;
	ctx.fillRect(0,0,cv.width,cv.height);

	//------Moon------//
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

	//------Windows------//
	//count1
	count1 = count1 + 1;
	ctx.fillStyle = "rgb(255,215,0)";
	if(count1 > 50 && (count1 % 50 >= 0 && count1 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(195,545,25,25);
	ctx.fillRect(990,395,25,25);

	ctx.fillStyle = "rgb(255,200,100)";
	if(count1 > 50 && (count1 % 50 >= 0 && count1 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(590,310,20,20);

	ctx.fillStyle = "rgb(255,240,150)";
	if(count1 > 50 && (count1 % 50 >= 0 && count1 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(70,420,15,15);
	ctx.fillRect(810,350,15,15);


	//count2
	count2 = count2 + 1;
	ctx.fillStyle = "rgb(255,215,0)";
	if(count2 > 50 && (count2 % 50 >= 0 && count2 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(310,410,25,25);

	ctx.fillStyle = "rgb(255,200,100)";
	if(count2 > 50 && (count2 % 50 >= 0 && count2 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(700,410,20,20);

	ctx.fillStyle = "rgb(255,240,150)";
	if(count2 > 50 && (count2 % 50 >= 0 && count2 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(735,230,15,15);
	ctx.fillRect(110,460,15,15);


	//count3
	count3 = count3 + 1;
	ctx.fillStyle = "rgb(255,215,0)";
	if(count3 > 50 && (count3 % 50 >= 0 && count3 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(1160,445,25,25);

	ctx.fillStyle = "rgb(255,200,100)";
	if(count3 > 50 && (count3 % 50 >= 0 && count3 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(650,310,20,20);

	ctx.fillStyle = "rgb(255,240,150)";
	if(count3 > 50 && (count3 % 50 >= 0 && count3 % 50 <= 20)) {
		ctx.globalAlpha = 1;
	}
	else {
		ctx.globalAlpha = 0;
	}
	ctx.fillRect(810,370,15,15);



	//------Clouds------//
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.globalAlpha = 0.8;

	ctx.beginPath();
	ctx.moveTo(400+cloudPos,120);
	ctx.lineTo(700+cloudPos,120);
	ctx.bezierCurveTo(800+cloudPos,100,700+cloudPos,0,660+cloudPos,75);
    ctx.bezierCurveTo(700+cloudPos,0,450+cloudPos,0,500+cloudPos,75);
    ctx.bezierCurveTo(400+cloudPos,0,350+cloudPos,100,400+cloudPos,120);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
	ctx.moveTo(0+cloudPos,320);
	ctx.lineTo(300+cloudPos,320);
	ctx.bezierCurveTo(400+cloudPos,300,300+cloudPos,200,260+cloudPos,275);
    ctx.bezierCurveTo(300+cloudPos,200,50+cloudPos,200,100+cloudPos,275);
    ctx.bezierCurveTo(0+cloudPos,200,-50+cloudPos,300,0+cloudPos,320);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
	ctx.moveTo(900+cloudPos,420);
	ctx.lineTo(1200+cloudPos,420);
	ctx.bezierCurveTo(1300+cloudPos,400,1200+cloudPos,300,1160+cloudPos,375);
    ctx.bezierCurveTo(1200+cloudPos,300,950+cloudPos,300,1000+cloudPos,375);
    ctx.bezierCurveTo(900+cloudPos,300,850+cloudPos,400,900+cloudPos,420);
    ctx.closePath();
    ctx.fill();

	cloudPos = cloudPos + 5;
	if(cloudPos > cv.width) {
		cloudPos = -1250;
	}
}

function windowFlicker(count) {

}







///////////////////////////////////////////
/*executing code setup from here*/
setup();
setInterval(draw, 100);
/*to here executing code setup*/
///////////////////////////////////////////