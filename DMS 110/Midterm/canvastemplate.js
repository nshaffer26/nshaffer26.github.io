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

var s;
var numR = 6;
var w;

var level = 0;
var lives = 3;
var blocks = [];
var bw = 200;
var bh = 30;
var pl = 120;
var initial = true;

var cr = 15;
var cx,cy;
var csx = 3;
var csy = 3;

function setup() {
	ctx.canvas.width  = window.innerWidth; 
	ctx.canvas.height = window.innerHeight;

	cx = cv.width/2;
	cy = cv.height/2;

	w = (cv.width-(numR*bw))/(numR-1);
}

function draw() {
	if(lives != 0) {
		if(level == 0) {
			start();
		}
		else if(level == 0.5) {
			instructions();
		}
		else if(level == 1) {
			pl = 120;
			if(initial) {
				csx = 3;
				csy = 3;
				numR = 4;
				bw = 300;
				w = (cv.width-(numR*bw))/(numR-1);
				for(var i = 0; i < cv.width; i+=(bw+w)) {
					for(var j = 0; j < 3; ++j) {
						blocks[blocks.length] = i;
						blocks[blocks.length] = j*40 + 35;
					}
				}
				initial = false;
			}
			level1();
		}
		else if(level == 2) {
			pl = 100;
			if(initial) {
				numR = 6;
				bw = 200;
				w = (cv.width-(numR*bw))/(numR-1);
				for(var i = 0; i < cv.width; i+=(bw+w)) {
					for(var j = 0; j < 4; ++j) {
						blocks[blocks.length] = i;
						blocks[blocks.length] = j*40 + 35;
					}
				}
				initial = false;
			}
			level2();
		}
		else if(level == 3) {
			pl = 90;
			if(initial) {
				numR = 8;
				bw = 150;
				w = (cv.width-(numR*bw))/(numR-1);
				for(var i = 0; i < cv.width; i+=(bw+w)) {
					for(var j = 0; j < 5; ++j) {
						blocks[blocks.length] = i;
						blocks[blocks.length] = j*40 + 35;
					}
				}
				initial = false;
			}
			level3();
		}
		else if(level == 4) {
			win();
		}
	}
	else {
		level = -1;
		gameOver();
	}

	if(level >= 1 && level <= 3) {
		if(cx <= 0+cr || cx >= cv.width-cr) {
			csx = csx * -1;
		}
		if(cy <= 30+cr) {
			csy = csy * -1;
		}
		if(cy >= cv.height-cr) {
			--lives;
			cx = cv.width/2;
			cy = cv.height/2;
			csx = Math.abs(csx);
			csy = Math.abs(csy);
		}
		if(cx >= mouseX-(pl/2) && cx <= mouseX+(pl/2) && cy >= cv.height-90-cr && cy <= cv.height-70+cr) {
			if( (cx >= mouseX-(pl/2) && cx <= (mouseX-(pl/2) + pl/3)) || (cx >= (mouseX+(pl/2) - pl/3) && cx <= mouseX+(pl/2)) ) {
				if(csx > 0) {
					csx = 1;
				}
				else {
					csx = -1;
				}
			}
			else {
				if(csx > 0) {
					csx = 3;
				}
				else {
					csx = -3;
				}
			}
			csy = csy * -1;
		}
		for(var i = 0; i < blocks.length; i+=2) {
			if(cx >= blocks[i] && cx <= blocks[i]+bw && cy >= blocks[i+1]-cr && cy <= blocks[i+1]+bh+cr) {
				csy = csy * -1;
				blocks.splice(i,2);
			}
		}
		cx = cx + csx;
		cy = cy + csy;
	}
}

/*Event Functions*/
function mouseDown() {
	if(level == 0) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-70 && mouseY <= cv.height/2-20) {
			level = 1;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+20 && mouseY <= cv.height/2+70) {
			level = 0.5;
		}
	}
	else if(level == 0.5) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+45 && mouseY <= cv.height/2+95) {
			level = 0;
		}
	}
	else if(level == -1) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+20 && mouseY <= cv.height/2+70) {
			level = 0;
			lives = 3;
			blocks = [];
			initial = true;
		}
	}
	else if(level == 4) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+20 && mouseY <= cv.height/2+70) {
			level = 0;
			lives = 3;
			blocks = [];
			initial = true;
		}
	}
}

function mouseUp() {
}

function mouseMove(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
}

function start() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.fillStyle = "rgb(220,220,220)";
	ctx.rect(cv.width/2-150,cv.height/2-150,300,300);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255)";
	//Start
	ctx.rect(cv.width/2-75,cv.height/2-70,150,50);
	//Instructions
	ctx.rect(cv.width/2-75,cv.height/2+20,150,50);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("         Start",cv.width/2-75,cv.height/2-38);
	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("    Instructions",cv.width/2-75,cv.height/2+52);
}

function instructions() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = 5;

	ctx.fillStyle = "rgb(220,220,220)";
	ctx.rect(cv.width/2-150,cv.height/2-150,300,300);
	ctx.stroke();
	ctx.fill();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Instructions:",cv.width/2-140,cv.height/2-125);
	ctx.fillText("Move the mouse back and forth",cv.width/2-140,cv.height/2-105);
	ctx.fillText("to move the platform. Your goal",cv.width/2-140,cv.height/2-85);
	ctx.fillText("is to clear all of the blocks at the",cv.width/2-140,cv.height/2-65);
	ctx.fillText("top of the screen. Hit the",cv.width/2-140,cv.height/2-45);
	ctx.fillText("platform closer to the edges to",cv.width/2-140,cv.height/2-25);
	ctx.fillText("bounce the ball off at a steeper",cv.width/2-140,cv.height/2-5);
	ctx.fillText("angle.",cv.width/2-140,cv.height/2+15);

	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255)";
	//Back
	ctx.rect(cv.width/2-75,cv.height/2+45,150,50);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("          Back",cv.width/2-75,cv.height/2+77);
}

function level1() {
	if(blocks.length == 0) {
		level = 2;
		cx = cv.width/2;
		cy = cv.height/2;
		initial = true;
	}

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);

	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.beginPath();
	ctx.rect(0,30,cv.width,cv.height-60);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Level: " + level,5,25);
	ctx.fillText("Lives: " + lives,5,cv.height-5);

	//Platform
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.lineWidth = 2;
	ctx.fillRect(mouseX-(pl/2),cv.height-90,pl,20);
	ctx.beginPath();
	ctx.moveTo((mouseX-(pl/2) + (pl/3)),cv.height-90);
	ctx.lineTo((mouseX-(pl/2) + (pl/3)),cv.height-70);
	ctx.moveTo((mouseX+(pl/2) - (pl/3)),cv.height-90);
	ctx.lineTo((mouseX+(pl/2) - (pl/3)),cv.height-70);
	ctx.stroke();

	//Bars
	for(var i = 0; i < blocks.length; i+=2) {
		ctx.beginPath();
		ctx.strokeStyle = "rgb(120,0,0)";
		ctx.lineWidth = 5;
		ctx.fillStyle = "rgb(255,100,100)";
		ctx.rect(blocks[i],blocks[i+1],bw,bh);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	//Ball
	ctx.fillStyle = "rgb(255,100,100)";
	ctx.beginPath();
	ctx.arc(cx,cy,cr,0,Math.PI*2);
	ctx.fill();
	ctx.closePath();
}

function level2() {
	if(blocks.length == 0) {
		level = 3;
		cx = cv.width/2;
		cy = cv.height/2;
		initial = true;
	}

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);

	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.beginPath();
	ctx.rect(0,30,cv.width,cv.height-60);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Level: " + level,5,25);
	ctx.fillText("Lives: " + lives,5,cv.height-5);

	//Platform
	ctx.fillStyle = "rgb(0,255,0)";
	ctx.lineWidth = 2;
	ctx.fillRect(mouseX-(pl/2),cv.height-90,pl,20);
	ctx.beginPath();
	ctx.moveTo((mouseX-(pl/2) + (pl/3)),cv.height-90);
	ctx.lineTo((mouseX-(pl/2) + (pl/3)),cv.height-70);
	ctx.moveTo((mouseX+(pl/2) - (pl/3)),cv.height-90);
	ctx.lineTo((mouseX+(pl/2) - (pl/3)),cv.height-70);
	ctx.stroke();

	//Bars
	for(var i = 0; i < blocks.length; i+=2) {
		ctx.beginPath();
		ctx.strokeStyle = "rgb(0,120,0)";
		ctx.lineWidth = 5;
		ctx.fillStyle = "rgb(100,255,100)";
		ctx.rect(blocks[i],blocks[i+1],bw,bh);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	//Ball
	ctx.fillStyle = "rgb(100,255,100)";
	ctx.beginPath();
	ctx.arc(cx,cy,cr,0,Math.PI*2);
	ctx.fill();
	ctx.closePath();
}

function level3() {
	if(blocks.length == 0) {
		level = 4;
		cx = cv.width/2;
		cy = cv.height/2;
		initial = true;
	}

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);

	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.beginPath();
	ctx.rect(0,30,cv.width,cv.height-60);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Level: " + level,5,25);
	ctx.fillText("Lives: " + lives,5,cv.height-5);

	//Platform
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.lineWidth = 2;
	ctx.fillRect(mouseX-(pl/2),cv.height-90,pl,20);
	ctx.beginPath();
	ctx.moveTo((mouseX-(pl/2) + (pl/3)),cv.height-90);
	ctx.lineTo((mouseX-(pl/2) + (pl/3)),cv.height-70);
	ctx.moveTo((mouseX+(pl/2) - (pl/3)),cv.height-90);
	ctx.lineTo((mouseX+(pl/2) - (pl/3)),cv.height-70);
	ctx.stroke();

	//Bars
	for(var i = 0; i < blocks.length; i+=2) {
		ctx.beginPath();
		ctx.strokeStyle = "rgb(0,0,120)";
		ctx.lineWidth = 5;
		ctx.fillStyle = "rgb(100,100,255)";
		ctx.rect(blocks[i],blocks[i+1],bw,bh);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	//Ball
	ctx.fillStyle = "rgb(100,100,255)";
	ctx.beginPath();
	ctx.arc(cx,cy,cr,0,Math.PI*2);
	ctx.fill();
	ctx.closePath();
}

function gameOver() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.fillStyle = "rgb(220,220,220)";
	ctx.rect(cv.width/2-150,cv.height/2-150,300,300);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255)";
	//Restart
	ctx.rect(cv.width/2-75,cv.height/2+20,150,50);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("    Game Over",cv.width/2-75,cv.height/2-38);
	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("        Restart",cv.width/2-75,cv.height/2+52);
}

function win() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = 5;

	ctx.beginPath();
	ctx.fillStyle = "rgb(220,220,220)";
	ctx.rect(cv.width/2-150,cv.height/2-150,300,300);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255)";
	//Restart
	ctx.rect(cv.width/2-75,cv.height/2+20,150,50);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("      You Win!",cv.width/2-75,cv.height/2-38);
	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("        Restart",cv.width/2-75,cv.height/2+52);
}

window.addEventListener("resize", setup);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);
//canvas.addEventListener('mouseleave', mouseUp);
setup();
setInterval(draw, 10);