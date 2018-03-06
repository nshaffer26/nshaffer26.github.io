///////////////////////////////////////////
/*setting up canvas from here*/
var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");
/*to here setting up canvas*/
///////////////////////////////////////////

//Center
var x,y;

//Large Circles
var x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6;
var x1s,y1s,x2s,y2s,x3s,y3s,x4s,y4s,x5s,y5s,x6s,y6s;
var cr1 = 75;

//Sub-Circles
//Circle 1
var x1x1,y1y1,x1x2,y1y2,x1x3,y1y3,x1x4,y1y4,x1x5,y1y5,x1x6,y1y6;
//Circle 2
var x2x1,y2y1,x2x2,y2y2,x2x3,y2y3,x1x4,y1y4,x1x5,y1y5,x1x6,y1y6;
//Circle 3
var x3x1,y3y1,x3x2,y3y2,x3x3,y3y3,x1x4,y1y4,x1x5,y1y5,x1x6,y1y6;
//Circle 4
var x4x1,y4y1,x4x2,y4y2,x4x3,y4y3,x1x4,y1y4,x1x5,y1y5,x1x6,y1y6;
//Circle 5
var x5x1,y5y1,x5x2,y5y2,x5x3,y5y3,x1x4,y1y4,x1x5,y1y5,x1x6,y1y6;
//Circle 6
var x6x1,y6y1,x6x2,y6y2,x6x3,y6y3,x1x4,y1y4,x1x5,y1y5,x1x6,y1y6;

var ret;

var sub1xs,sub1ys,sub2xs,sub2ys,sub3xs,sub3ys,sub4xs,sub4ys,sub5xs,sub5ys,sub6xs,sub6ys;
var sub7xs,sub7ys,sub8xs,sub8ys,sub9xs,sub9ys,sub10xs,sub10ys,sub11xs,sub11ys,sub12xs,sub12ys;
var sub13xs,sub13ys,sub14xs,sub14ys,sub15xs,sub15ys,sub16xs,sub16ys,sub17xs,sub17ys,sub18xs,sub18ys;
var sub19xs,sub19ys,sub20xs,sub20ys,sub21xs,sub21ys,sub22xs,sub22ys,sub23xs,sub23ys,sub24xs,sub24ys;
var sub25xs,sub25ys,sub26xs,sub26ys,sub27xs,sub27ys,sub28xs,sub28ys,sub29xs,sub29ys,sub30xs,sub30ys;
var sub31xs,sub31ys,sub32xs,sub32ys,sub33xs,sub33ys,sub34xs,sub34ys,sub35xs,sub35ys,sub36xs,sub36ys;
var cr2 = 8;

var r,g,b;



//SETUP FUNCTION : EXECUTED ONLY ONCE
function setup() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	x = x1 = x2 = x3 = x4 = x5 = x6 = cv.width/2;
	y = y1 = y2 = y3 = y4 = y5 = y6 = cv.height/2;

	x1x1 = x1x2 = x1x3 = x1x4 = x1x5 = x1x6 = cv.width/2;	y1y1 = y1y2 = y1y3 = y1y4 = y1y5 = y1y6 = cv.height/2;
	x2x1 = x2x2 = x2x3 = x2x4 = x2x5 = x2x6 = cv.width/2;	y2y1 = y2y2 = y2y3 = y2y4 = y2y5 = y2y6 = cv.height/2;
	x3x1 = x3x2 = x3x3 = x3x4 = x3x5 = x3x6 = cv.width/2;	y3y1 = y3y2 = y3y3 = y3y4 = y3y5 = y3y6 = cv.height/2;
	x4x1 = x4x2 = x4x3 = x4x4 = x4x5 = x4x6 = cv.width/2;	y4y1 = y4y2 = y4y3 = y4y4 = y4y5 = y4y6 = cv.height/2;
	x5x1 = x5x2 = x5x3 = x5x4 = x5x5 = x5x6 = cv.width/2;	y5y1 = y5y2 = y5y3 = y5y4 = y5y5 = y5y6 = cv.height/2;
	x6x1 = x6x2 = x6x3 = x6x4 = x6x5 = x6x6 = cv.width/2;	y6y1 = y6y2 = y6y3 = y6y4 = y6y5 = y6y6 = cv.height/2;

	x1s = rand();	y1s = rand();
	x2s = rand();	y2s = rand();
	x3s = rand();	y3s = rand();
	x4s = rand();	y4s = rand();
	x5s = rand();	y5s = rand();
	x6s = rand();	y6s = rand();

	sub1xs = randS();	sub1ys = randS();
	sub2xs = randS();	sub2ys = randS();
	sub3xs = randS();	sub3ys = randS();
	sub4xs = randS();	sub4ys = randS();
	sub5xs = randS();	sub5ys = randS();
	sub6xs = randS();	sub6ys = randS();
	sub7xs = randS();	sub7ys = randS();
	sub8xs = randS();	sub8ys = randS();
	sub9xs = randS();	sub9ys = randS();
	sub10xs = randS();	sub10ys = randS();
	sub11xs = randS();	sub11ys = randS();
	sub12xs = randS();	sub12ys = randS();
	sub13xs = randS();	sub13ys = randS();
	sub14xs = randS();	sub14ys = randS();
	sub15xs = randS();	sub15ys = randS();
	sub16xs = randS();	sub16ys = randS();
	sub17xs = randS();	sub17ys = randS();
	sub18xs = randS();	sub18ys = randS();
	sub19xs = randS();	sub19ys = randS();
	sub20xs = randS();	sub20ys = randS();
	sub21xs = randS();	sub21ys = randS();
	sub22xs = randS();	sub22ys = randS();
	sub23xs = randS();	sub23ys = randS();
	sub24xs = randS();	sub24ys = randS();
	sub25xs = randS();	sub25ys = randS();
	sub26xs = randS();	sub26ys = randS();
	sub27xs = randS();	sub27ys = randS();
	sub28xs = randS();	sub28ys = randS();
	sub29xs = randS();	sub29ys = randS();
	sub30xs = randS();	sub30ys = randS();
	sub31xs = randS();	sub31ys = randS();
	sub32xs = randS();	sub32ys = randS();
	sub33xs = randS();	sub33ys = randS();
	sub34xs = randS();	sub34ys = randS();
	sub35xs = randS();	sub35ys = randS();
	sub36xs = randS();	sub36ys = randS();
	

	ret = [x1x1,y1y1,sub1xs,sub1ys];

	r = Math.floor(Math.random() * 255);
	g = Math.floor(Math.random() * 255);
	b = Math.floor(Math.random() * 255);
}

//DRAW FUNCTION : EXECUTED REPEATEDLY - UNTIL YOU QUIT THE PROGRAM
function draw() {
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,cv.width,cv.height);

	//Large Circles
	ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
	ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",0.5)";
	ctx.lineWidth = 2;
	
	circles(x1,y1,cr1);
	circles(x2,y2,cr1);
	circles(x3,y3,cr1);
	circles(x4,y4,cr1);
	circles(x5,y5,cr1);
	circles(x6,y6,cr1);

	x1 = x1 + x1s;	x1s = speedBigX(x1,x1s);
	y1 = y1 + y1s;	y1s = speedBigY(y1,y1s);
	x2 = x2 + x2s;	x2s = speedBigX(x2,x2s);
	y2 = y2 + y2s;	y2s = speedBigY(y2,y2s);
	x3 = x3 + x3s;	x3s = speedBigX(x3,x3s);
	y3 = y3 + y3s;	y3s = speedBigY(y3,y3s);
	x4 = x4 + x4s;	x4s = speedBigX(x4,x4s);
	y4 = y4 + y4s;	y4s = speedBigY(y4,y4s);
	x5 = x5 + x5s;	x5s = speedBigX(x5,x5s);
	y5 = y5 + y5s;	y5s = speedBigY(y5,y5s);
	x6 = x6 + x6s;	x6s = speedBigX(x6,x6s);
	y6 = y6 + y6s;	y6s = speedBigY(y6,y6s);

	//Lines
	ctx.strokeStyle = "rgb(255,255,255)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(x1x1,y1y1);
	ctx.lineTo(x2x1,y2y1);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(x1x2,y1y2);
	ctx.lineTo(x2x2,y2y2);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(x3x1,y3y1);
	ctx.lineTo(x4x1,y4y1);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(x3x2,y3y2);
	ctx.lineTo(x4x2,y4y2);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(x5x1,y5y1);
	ctx.lineTo(x6x1,y6y1);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(x5x2,y5y2);
	ctx.lineTo(x6x2,y6y2);
	ctx.stroke();
	ctx.closePath();

	//Sub-Circles
	ctx.fillStyle = "rgba(150,150,150,0.5)";
	ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
	ctx.lineWidth = 2.5;

	circles(x1x1,y1y1,cr2);
	circles(x1x2,y1y2,cr2);
	circles(x1x3,y1y3,cr2);
	circles(x1x4,y1y4,cr2);
	circles(x1x5,y1y5,cr2);
	circles(x1x6,y1y6,cr2);
	locSmall(x1x1,y1y1,x1,y1,sub1xs,sub1ys,x1s,y1s);
	x1x1 = ret[0];
	y1y1 = ret[1];
	sub1xs = ret[2];
	sub1ys = ret[3];
	locSmall(x1x2,y1y2,x1,y1,sub2xs,sub2ys,x1s,y1s);
	x1x2 = ret[0];
	y1y2 = ret[1];
	sub2xs = ret[2];
	sub2ys = ret[3];
	locSmall(x1x3,y1y3,x1,y1,sub3xs,sub3ys,x1s,y1s);
	x1x3 = ret[0];
	y1y3 = ret[1];
	sub3xs = ret[2];
	sub3ys = ret[3];
	locSmall(x1x4,y1y4,x1,y1,sub19xs,sub19ys,x1s,y1s);
	x1x4 = ret[0];
	y1y4 = ret[1];
	sub19xs = ret[2];
	sub19ys = ret[3];
	locSmall(x1x5,y1y5,x1,y1,sub20xs,sub20ys,x1s,y1s);
	x1x5 = ret[0];
	y1y5 = ret[1];
	sub20xs = ret[2];
	sub20ys = ret[3];
	locSmall(x1x6,y1y6,x1,y1,sub21xs,sub21ys,x1s,y1s);
	x1x6 = ret[0];
	y1y6 = ret[1];
	sub21xs = ret[2];
	sub21ys = ret[3];

	circles(x2x1,y2y1,cr2);
	circles(x2x2,y2y2,cr2);
	circles(x2x3,y2y3,cr2);
	circles(x2x4,y2y4,cr2);
	circles(x2x5,y2y5,cr2);
	circles(x2x6,y2y6,cr2);
	locSmall(x2x1,y2y1,x2,y2,sub4xs,sub4ys,x2s,y2s);
	x2x1 = ret[0];
	y2y1 = ret[1];
	sub4xs = ret[2];
	sub4ys = ret[3];
	locSmall(x2x2,y2y2,x2,y2,sub5xs,sub5ys,x2s,y2s);
	x2x2 = ret[0];
	y2y2 = ret[1];
	sub5xs = ret[2];
	sub5ys = ret[3];
	locSmall(x2x3,y2y3,x2,y2,sub6xs,sub6ys,x2s,y2s);
	x2x3 = ret[0];
	y2y3 = ret[1];
	sub6xs = ret[2];
	sub6ys = ret[3];
	locSmall(x2x4,y2y4,x2,y2,sub22xs,sub22ys,x2s,y2s);
	x2x4 = ret[0];
	y2y4 = ret[1];
	sub22xs = ret[2];
	sub22ys = ret[3];
	locSmall(x2x5,y2y5,x2,y2,sub23xs,sub23ys,x2s,y2s);
	x2x5 = ret[0];
	y2y5 = ret[1];
	sub23xs = ret[2];
	sub23ys = ret[3];
	locSmall(x2x6,y2y6,x2,y2,sub24xs,sub24ys,x2s,y2s);
	x2x6 = ret[0];
	y2y6 = ret[1];
	sub24xs = ret[2];
	sub24ys = ret[3];

	circles(x3x1,y3y1,cr2);
	circles(x3x2,y3y2,cr2);
	circles(x3x3,y3y3,cr2);
	circles(x3x4,y3y4,cr2);
	circles(x3x5,y3y5,cr2);
	circles(x3x6,y3y6,cr2);
	locSmall(x3x1,y3y1,x3,y3,sub7xs,sub7ys,x3s,y3s);
	x3x1 = ret[0];
	y3y1 = ret[1];
	sub7xs = ret[2];
	sub7ys = ret[3];
	locSmall(x3x2,y3y2,x3,y3,sub8xs,sub8ys,x3s,y3s);
	x3x2 = ret[0];
	y3y2 = ret[1];
	sub8xs = ret[2];
	sub8ys = ret[3];
	locSmall(x3x3,y3y3,x3,y3,sub9xs,sub9ys,x3s,y3s);
	x3x3 = ret[0];
	y3y3 = ret[1];
	sub9xs = ret[2];
	sub9ys = ret[3];
	locSmall(x3x4,y3y4,x3,y3,sub25xs,sub25ys,x3s,y3s);
	x3x4 = ret[0];
	y3y4 = ret[1];
	sub25xs = ret[2];
	sub25ys = ret[3];
	locSmall(x3x5,y3y5,x3,y3,sub26xs,sub26ys,x3s,y3s);
	x3x5 = ret[0];
	y3y5 = ret[1];
	sub26xs = ret[2];
	sub26ys = ret[3];
	locSmall(x3x6,y3y6,x3,y3,sub27xs,sub27ys,x3s,y3s);
	x3x6 = ret[0];
	y3y6 = ret[1];
	sub27xs = ret[2];
	sub27ys = ret[3];

	circles(x4x1,y4y1,cr2);
	circles(x4x2,y4y2,cr2);
	circles(x4x3,y4y3,cr2);
	circles(x4x4,y4y4,cr2);
	circles(x4x5,y4y5,cr2);
	circles(x4x6,y4y6,cr2);
	locSmall(x4x1,y4y1,x4,y4,sub10xs,sub10ys,x4s,y4s);
	x4x1 = ret[0];
	y4y1 = ret[1];
	sub10xs = ret[2];
	sub10ys = ret[3];
	locSmall(x4x2,y4y2,x4,y4,sub11xs,sub11ys,x4s,y4s);
	x4x2 = ret[0];
	y4y2 = ret[1];
	sub11xs = ret[2];
	sub11ys = ret[3];
	locSmall(x4x3,y4y3,x4,y4,sub12xs,sub12ys,x4s,y4s);
	x4x3 = ret[0];
	y4y3 = ret[1];
	sub12xs = ret[2];
	sub12ys = ret[3];
	locSmall(x4x4,y4y4,x4,y4,sub28xs,sub28ys,x4s,y4s);
	x4x4 = ret[0];
	y4y4 = ret[1];
	sub28xs = ret[2];
	sub28ys = ret[3];
	locSmall(x4x5,y4y5,x4,y4,sub29xs,sub29ys,x4s,y4s);
	x4x5 = ret[0];
	y4y5 = ret[1];
	sub29xs = ret[2];
	sub29ys = ret[3];
	locSmall(x4x6,y4y6,x4,y4,sub30xs,sub30ys,x4s,y4s);
	x4x6 = ret[0];
	y4y6 = ret[1];
	sub30xs = ret[2];
	sub30ys = ret[3];

	circles(x5x1,y5y1,cr2);
	circles(x5x2,y5y2,cr2);
	circles(x5x3,y5y3,cr2);
	circles(x5x4,y5y4,cr2);
	circles(x5x5,y5y5,cr2);
	circles(x5x6,y5y6,cr2);
	locSmall(x5x1,y5y1,x5,y5,sub13xs,sub13ys,x5s,y5s);
	x5x1 = ret[0];
	y5y1 = ret[1];
	sub13xs = ret[2];
	sub13ys = ret[3];
	locSmall(x5x2,y5y2,x5,y5,sub14xs,sub14ys,x5s,y5s);
	x5x2 = ret[0];
	y5y2 = ret[1];
	sub14xs = ret[2];
	sub14ys = ret[3];
	locSmall(x5x3,y5y3,x5,y5,sub15xs,sub15ys,x5s,y5s);
	x5x3 = ret[0];
	y5y3 = ret[1];
	sub15xs = ret[2];
	sub15ys = ret[3];
	locSmall(x5x4,y5y4,x5,y5,sub31xs,sub31ys,x5s,y5s);
	x5x4 = ret[0];
	y5y4 = ret[1];
	sub31xs = ret[2];
	sub31ys = ret[3];
	locSmall(x5x5,y5y5,x5,y5,sub32xs,sub32ys,x5s,y5s);
	x5x5 = ret[0];
	y5y5 = ret[1];
	sub32xs = ret[2];
	sub32ys = ret[3];
	locSmall(x5x6,y5y6,x5,y5,sub33xs,sub33ys,x5s,y5s);
	x5x6 = ret[0];
	y5y6 = ret[1];
	sub33xs = ret[2];
	sub33ys = ret[3];

	circles(x6x1,y6y1,cr2);
	circles(x6x2,y6y2,cr2);
	circles(x6x3,y6y3,cr2);
	circles(x6x4,y6y4,cr2);
	circles(x6x5,y6y5,cr2);
	circles(x6x6,y6y6,cr2);
	locSmall(x6x1,y6y1,x6,y6,sub16xs,sub16ys,x6s,y6s);
	x6x1 = ret[0];
	y6y1 = ret[1];
	sub16xs = ret[2];
	sub16ys = ret[3];
	locSmall(x6x2,y6y2,x6,y6,sub17xs,sub17ys,x6s,y6s);
	x6x2 = ret[0];
	y6y2 = ret[1];
	sub17xs = ret[2];
	sub17ys = ret[3];
	locSmall(x6x3,y6y3,x6,y6,sub18xs,sub18ys,x6s,y6s);
	x6x3 = ret[0];
	y6y3 = ret[1];
	sub18xs = ret[2];
	sub18ys = ret[3];
	locSmall(x6x4,y6y4,x6,y6,sub34xs,sub34ys,x6s,y6s);
	x6x4 = ret[0];
	y6y4 = ret[1];
	sub34xs = ret[2];
	sub34ys = ret[3];
	locSmall(x6x5,y6y5,x6,y6,sub35xs,sub35ys,x6s,y6s);
	x6x5 = ret[0];
	y6y5 = ret[1];
	sub35xs = ret[2];
	sub35ys = ret[3];
	locSmall(x6x6,y6y6,x6,y6,sub36xs,sub36ys,x6s,y6s);
	x6x6 = ret[0];
	y6y6 = ret[1];
	sub36xs = ret[2];
	sub36ys = ret[3];
}

function speedBigX(cx,cs) {
	if(cx >= cv.width-cr1 || cx <= 0+cr1) {
		cs = cs * -1;
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
	return cs;
}

function speedBigY(cy,cs) {
	if(cy >= cv.height-cr1 || cy <= 0+cr1) {
		cs = cs * -1;
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}
	return cs;
}

function locSmall(cxsm,cysm,cxlg,cylg,cxssm,cyssm,cxslg,cyslg) {
	cxsm = cxsm + cxssm + cxslg;
	cysm = cysm + cyssm + cyslg;
	if(dist(cxsm,cysm,cxlg,cylg) >= cr1-cr2) {
		cxssm = cxssm * -1;
		cyssm = cyssm * -1;
		cxsm = cxsm + cxssm + cxssm*4.5;
		cysm = cysm + cyssm + cyssm*4.5;
	}
	ret[0] = cxsm;
	ret[1] = cysm;
	ret[2] = cxssm;
	ret[3] = cyssm;
	return ret;
}

function circles(cx,cy,cr) {
	ctx.beginPath();
	ctx.arc(cx,cy,cr,0,Math.PI*2);
	ctx.fill();
	ctx.stroke();
}

function dist(cx1,cy1,cx2,cy2) {
	return Math.sqrt( (Math.pow((cx1-cx2),2)) + (Math.pow((cy1-cy2),2)) );
}

function rand() {
	var sp = Math.floor((Math.random() * 100) % 6) + 1;
	if((Math.floor(Math.random() * 20)) % 2 == 0) {
		sp = sp * -1;
	}
	return sp;
}

function randS() {
	var sp = Math.floor((Math.random() * 100) % 4) + 1;
	if((Math.floor(Math.random() * 20)) % 2 == 0) {
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