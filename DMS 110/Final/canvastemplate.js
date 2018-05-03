var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");


var winMusic = document.getElementById("win");
var playedWin = false;
var music = document.getElementById("music");
var musicOn = false;


var mouseX, mouseY;

var keysDown = {};


var level = 0; //Start=0,Instructions=0.5,Win=4, Easy=1,Medium=2,Hard=3
var sz; //Easy=90,Medium=60,Hard=40

//Maze
var blocksX = [];
var blocksY = [];
var color = [];
var rows;
var cols;
var initial = true;
var zoomed = false;
var timesZoomed = 0;
var moved = false;
//Start
var currentX = 0;
var currentY = 1;
var zBlocksX = [];
var zBlocksY = [];
var zColor = [];


function setup() {
	ctx.canvas.width  = window.innerWidth; 
	ctx.canvas.height = window.innerHeight;

	//Zoom
	for(var i = 0; i < 3; i++) {
		zColor[i] = new Array(3);
	}
	for(var i = 0; i < 3; i++) {
		zBlocksX[i] = i * cv.width/3;
	}
	for(var i = 0; i < 3; i++) {
		zBlocksY[i] = i * cv.height/3;
	}
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			zColor[i][j] = 0;
		}
	}
}

function draw() {
	if(musicOn) {
		music.play();
	}
	else {
		music.pause();
	}

	if(level == 0) {
		start();
	}
	else if(level == 0.5) {
		instructions();
	}
	else if(level == 1) {
		if(initial) {
			level1();
			initial = false;
		}
	}
	else if(level == 2) {
		if(initial) {
			level2();
			initial = false;
		}
	}
	else if(level == 3) {
		if(initial) {
			level3();
			initial = false;
		}
	}
	
	if(currentX == cols-1 && currentY == rows-2) {
		level = 4;
		win();
	}
}

/*Event Functions*/
function mouseDown() {
	if(level == 0) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-165 && mouseY <= cv.height/2-115) {
			level = 1;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-95 && mouseY <= cv.height/2-45) {
			level = 2;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-25 && mouseY <= cv.height/2+25) {
			level = 3;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+60 && mouseY <= cv.height/2+110) {
			level = 0.5;
		}
		else if(mouseX >= cv.width/2+30 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+120 && mouseY <= cv.height/2+170) {
			if(musicOn) {
				musicOn = false;
			}
			else {
				musicOn = true;
				music.load();
			}
		}
	}
	else if(level == 0.5) {
		if(mouseX >= 5 && mouseX <= 155 && mouseY >= 5 && mouseY <= 55) {
			level = 0;
		}
	}
	else if(level >= 1 && level <= 3) {
		if(zoomed) {
			if(mouseX >= cv.width/3 && mouseX <= 2*cv.width/3 && mouseY >= 0 && mouseY <= cv.height/3) {
				//Up
				if(zColor[0][1] == 255) {
					currentY--;
					moved = true;
					setZoom();
				}
			}
			else if(mouseX >= cv.width/3 && mouseX <= 2*cv.width/3 && mouseY >= 2*cv.height/3 && mouseY <= cv.height) {
				//Down
				if(zColor[2][1] == 255) {
					currentY++;
					moved = true;
					setZoom();
				}
			}
			else if(mouseX >= 0 && mouseX <= cv.width/3 && mouseY >= cv.height/3 && mouseY <= 2*cv.height/3) {
				//Left
				if(zColor[1][0] == 255) {
					currentX--;
					moved = true;
					setZoom();
				}
			}
			else if(mouseX >= 2*cv.width/3 && mouseX <= cv.width && mouseY >= cv.height/3 && mouseY <= 2*cv.height/3) {
				//Right
				if(zColor[1][2] == 255) {
					currentX++;
					moved = true;
					setZoom();
				}
			}
		}
	}
	else if(level == 4) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+20 && mouseY <= cv.height/2+70) {
			level = 0;
			playedWin = false;
			initial = true;
			zoomed = false;
			timesZoomed = 0;
			moved = false;
			currentX = 0;
			currentY = 1;
			start();
		}
	}
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
	ctx.rect(cv.width/2-150,cv.height/2-200,300,400);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255)";
	//Easy
	ctx.rect(cv.width/2-75,cv.height/2-165,150,50);
	//Medium
	ctx.rect(cv.width/2-75,cv.height/2-95,150,50);
	//Hard
	ctx.rect(cv.width/2-75,cv.height/2-25,150,50);
	//Instructions
	ctx.rect(cv.width/2-75,cv.height/2+60,150,50);
	//Sound
	ctx.rect(cv.width/2-75,cv.height/2+120,150,50);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.moveTo(cv.width/2+30,cv.height/2+120);
	ctx.lineTo(cv.width/2+30,cv.height/2+170);
	ctx.stroke();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("          Easy",cv.width/2-75,cv.height/2-132);
	ctx.fillText("        Medium",cv.width/2-75,cv.height/2-62);
	ctx.fillText("          Hard",cv.width/2-75,cv.height/2+8);
	ctx.fillText("    Instructions",cv.width/2-75,cv.height/2+93);
	if(!musicOn) {
		ctx.fillText("     Music      Off",cv.width/2-75,cv.height/2+153);
	}
	else {
		ctx.fillText("     Music      On",cv.width/2-75,cv.height/2+153);
	}
}

function instructions() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = 5;

	ctx.fillStyle = "rgb(220,220,220)";
	ctx.rect(cv.width/2-200,cv.height/2-250,400,500);
	ctx.stroke();
	ctx.fill();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Instructions:",cv.width/2-195,cv.height/2-225);
	ctx.fillText("Your goal is to get to the end of the maze.",cv.width/2-195,cv.height/2-205);
	ctx.fillText("You will be able to see the whole maze",cv.width/2-195,cv.height/2-185);
	ctx.fillText("at the beginning of the level. To start",cv.width/2-195,cv.height/2-165);
	ctx.fillText("moving, hit the space bar to zoom in on",cv.width/2-195,cv.height/2-145);
	ctx.fillText("your current location. You can continue to",cv.width/2-195,cv.height/2-125);
	ctx.fillText("zoom in and out throughout the game using",cv.width/2-195,cv.height/2-105);
	ctx.fillText("the space bar, but you can only move if you",cv.width/2-195,cv.height/2-85);
	ctx.fillText("are zoomed in.",cv.width/2-195,cv.height/2-65);
	//Line break
	ctx.fillText("To start a game, select a difficulty. There",cv.width/2-195,cv.height/2-25);
	ctx.fillText("are 3 difficulties, and their rules are as",cv.width/2-195,cv.height/2-5);
	ctx.fillText("follows:",cv.width/2-195,cv.height/2+15);
	ctx.fillText("   Easy - Zoom in and out as many times as",cv.width/2-195,cv.height/2+35);
	ctx.fillText("     you'd like. This will be the smallest maze",cv.width/2-195,cv.height/2+55);
	ctx.fillText("     of the 3 difficulties.",cv.width/2-195,cv.height/2+75);
	ctx.fillText("   Medium - You can only zoom out 5 times",cv.width/2-195,cv.height/2+95);
	ctx.fillText("     throughout the duration of the maze.",cv.width/2-195,cv.height/2+115);
	ctx.fillText("     This will be a medium sized maze.",cv.width/2-195,cv.height/2+135);
	ctx.fillText("   Hard - You can only zoom out 3 times.",cv.width/2-195,cv.height/2+155);
	ctx.fillText("     Use them wisely! This will be the",cv.width/2-195,cv.height/2+175);
	ctx.fillText("     largest maze.",cv.width/2-195,cv.height/2+195);

	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255)";
	//Back
	ctx.rect(5,5,150,50);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("         Back",5,36);
}

function level1() {
	ctx.strokeStyle = "rgb(255,0,0)";
	setUpMaze(90);
	drawMaze();
}

function level2() {
	ctx.strokeStyle = "rgb(0,255,0)";
	setUpMaze(60);
	drawMaze();
}

function level3() {
	ctx.strokeStyle = "rgb(0,0,255)";
	setUpMaze(40);
	drawMaze();
}

function win() {
	if(!playedWin && musicOn) {
		musicOn = false;
		music.load();
		winMusic.play();
		playedWin = true;
	}
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(cv.width/14,cv.height/14,12*cv.width/14,12*cv.height/14);
	ctx.fillStyle = "rgb(0,255,0)";
	ctx.fillRect(cv.width/10,cv.height/10,8*cv.width/10,8*cv.height/10);
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(cv.width/8,cv.height/8,6*cv.width/8,6*cv.height/8);
	ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(cv.width/5,cv.height/5,3*cv.width/5,3*cv.height/5);
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

function setUpMaze(s) {
	sz = s;
	rows = Math.ceil(cv.height/sz);
	cols = Math.ceil(cv.width/sz);
	for(var i = 0; i < rows; i++) {
		color[i] = new Array(cols);
	}
	for(var i = 0; i < cols; i++) {
		blocksX[i] = i * cv.width/cols;
	}
	for(var i = 0; i < rows; i++) {
		blocksY[i] = i * cv.height/rows;
	}
	//Initialize
	generateMaze();
	//Make solvable
	var r = 1;
	var c = 1;
	var count = 0;
	var prev = -1;
	//Came from... left=1,right=2,up=3,down=4
	while(r <= rows-1 && c <= cols-1) {
		if(count < 5000) {
			if(prev != 1 && color[r][c+1] == 255) {
				c++;
				prev = 1;
			}
			else if(prev != 3 && color[r+1][c] == 255) {
				r++;
				prev = 3;
			}
			else if(prev != 4 && color[r-1][c] == 255) {
				r--;
				prev = 4;
			}
			else if(prev != 2 && color[r][c-1] == 255) {
				c--;
				prev = 2;
			}
		}
		else {
			generateMaze();
			break;
		}
		count++;
	}
	color[1][2] = 255;
	color[2][1] = 255;
	color[2][2] = 255;

	color[1][cols-2] = 255;
	color[1][cols-3] = 255;
	color[2][cols-2] = 255;
	color[2][cols-3] = 255;

	color[rows-2][1] = 255;
	color[rows-2][2] = 255;
	color[rows-3][1] = 255;
	color[rows-3][2] = 255;

	color[rows-2][cols-3] = 255;
	color[rows-3][cols-2] = 255;	
	color[rows-3][cols-3] = 255;
}

function generateMaze() {
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++) {
			var temp = Math.floor(Math.random() * 200);
			if((i == 1 && j == 0) || (i == 1 && j == 1) || (i == rows-2 && j == cols-1) || (i == rows-2 && j == cols-2)) {
				color[i][j] = 255;
			}
			else if(temp % 2 == 0 || (i == 0 || j == 0) || (i == rows-1 || j == cols-1)) {
				color[i][j] = 0;
			}
			else {
				color[i][j] = 255;
			}
		}
	}
	var tempArr = new Array();
	tempArr = color;
	for(var i = 1; i < rows-1; i++) {
		for(var j = 1; j < cols-1; j++) {
			var count = 0;
			if(tempArr[i-1][j] == 0) {
				count++;
			}
			if(tempArr[i+1][j] == 0) {
				count++;
			}
			if(tempArr[i][j-1] == 0) {
				count++;
			}
			if(tempArr[i][j+1] == 0) {
				count++;
			}
			if(tempArr[i-1][j-1] == 0) {
				count++;
			}
			if(tempArr[i+1][j+1] == 0) {
				count++;
			}
			if(tempArr[i+1][j-1] == 0) {
				count++;
			}
			if(tempArr[i-1][j+1] == 0) {
				count++;
			}

			if(count <= 3) {
				color[i][j] = 0;
			}
		}
	}
	for(var i = 1; i < rows-1; i++) {
		for(var j = 1; j < cols-1; j++) {
			var count = 0;
			if(tempArr[i-1][j] == 0) {
				count++;
			}
			if(tempArr[i+1][j] == 0) {
				count++;
			}
			if(tempArr[i][j-1] == 0) {
				count++;
			}
			if(tempArr[i][j+1] == 0) {
				count++;
			}
			if(tempArr[i-1][j-1] == 0) {
				count++;
			}
			if(tempArr[i+1][j+1] == 0) {
				count++;
			}
			if(tempArr[i+1][j-1] == 0) {
				count++;
			}
			if(tempArr[i-1][j+1] == 0) {
				count++;
			}

			if(count >= 5) {
				color[i][j] = 255;
			}
		}
	}
	for(var i = 1; i < rows-1; i++) {
		for(var j = 1; j < cols-1; j++) {
			var count = 0;
			if(tempArr[i-1][j] == 255) {
				count++;
			}
			if(tempArr[i+1][j] == 255) {
				count++;
			}
			if(tempArr[i][j-1] == 255) {
				count++;
			}
			if(tempArr[i][j+1] == 255) {
				count++;
			}
			if(tempArr[i-1][j-1] == 255) {
				count++;
			}
			if(tempArr[i+1][j+1] == 255) {
				count++;
			}
			if(tempArr[i+1][j-1] == 255) {
				count++;
			}
			if(tempArr[i-1][j+1] == 255) {
				count++;
			}

			if(count == 8) {
				color[i][j] = 255;
			}
		}
	}
	for(var i = 1; i < rows-1; i++) {
		for(var j = 1; j < cols-1; j++) {
			var countW = 0;
			var countB = 0;
			if(tempArr[i-1][j] == 255) {
				countW++;
			}
			if(tempArr[i+1][j] == 255) {
				countW++;
			}
			if(tempArr[i][j-1] == 255) {
				countW++;
			}
			if(tempArr[i][j+1] == 255) {
				countW++;
			}

			if(i-1 != 0 && tempArr[i-1][j] == 0) {
				countB++;
			}
			if(i+1 != rows-1 && tempArr[i+1][j] == 0) {
				countB++;
			}
			if(j-1 != 0 && tempArr[i][j-1] == 0) {
				countB++;
			}
			if(j+1 != cols-1 && tempArr[i][j+1] == 0) {
				countB++;
			}
			if(i-1 != 0 && j-1 != 0 && tempArr[i-1][j-1] == 0) {
				countB++;
			}
			if(i+1 != rows-1 && j+1 != cols-1 && tempArr[i+1][j+1] == 0) {
				countB++;
			}
			if(i+1 != rows-1 && j-1 != 0 && tempArr[i+1][j-1] == 0) {
				countB++;
			}
			if(i-1 != 0 && j+1 != cols-1 && tempArr[i-1][j+1] == 0) {
				countB++;
			}

			if(countW >= 2 && countB >= 3 && tempArr[i][j] == 0)  {
				color[i][j] = 255;
			}
		}
	}
}

function drawMaze() {
	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < cols; j++) {
			ctx.fillStyle = "rgb(" + color[i][j] + "," + color[i][j] + "," + color[i][j] + ")";
			ctx.lineWidth = 0.5;
			ctx.beginPath();
			ctx.rect(blocksX[j],blocksY[i],cv.width/cols,cv.height/rows);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}
	}
	if(level == 1) {
		ctx.fillStyle = "rgb(255,0,0)";
	}
	else if(level == 2) {
		ctx.font = "30px Arial";
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillText("Zoom Outs Used: " + Math.floor(timesZoomed/2),5,40);
		ctx.fillStyle = "rgb(0,255,0)";
	}
	else if(level == 3) {
		ctx.font = "20px Arial";
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillText("Zoom Outs Used: " + Math.floor(timesZoomed/2),5,28);
		ctx.fillStyle = "rgb(0,0,255)";
	}
	ctx.fillRect(blocksX[currentX],blocksY[currentY],cv.width/cols,cv.height/rows);
}

function setZoom() {
	if(currentX == 0 && currentY == 1) {
		zColor[0][0] = 0;
		zColor[1][0] = 0;
		zColor[2][0] = 0;
		zColor[0][1] = color[currentY-1][currentX];
		zColor[1][1] = color[currentY][currentX];
		zColor[2][1] = color[currentY+1][currentX];
		zColor[0][2] = color[currentY-1][currentX+1];
		zColor[1][2] = color[currentY][currentX+1];
		zColor[2][2] = color[currentY+1][currentX+1];
	}
	else {
		zColor[0][0] = color[currentY-1][currentX-1];
		zColor[1][0] = color[currentY][currentX-1];
		zColor[2][0] = color[currentY+1][currentX-1];
		zColor[0][1] = color[currentY-1][currentX];
		zColor[1][1] = color[currentY][currentX];
		zColor[2][1] = color[currentY+1][currentX];
		zColor[0][2] = color[currentY-1][currentX+1];
		zColor[1][2] = color[currentY][currentX+1];
		zColor[2][2] = color[currentY+1][currentX+1];
	}
	zoom()
}

function zoom() {
	if(zoomed && !moved) {
		zoomed = false;
		drawMaze();
	}
	else {
		zoomed = true;
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				ctx.fillStyle = "rgb(" + zColor[i][j] + "," + zColor[i][j] + "," + zColor[i][j] + ")";
				ctx.lineWidth = 0.5;
				ctx.beginPath();
				ctx.rect(zBlocksX[j],zBlocksY[i],cv.width/3,cv.height/3);
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
			}
		}
		if(level == 1) {
			ctx.fillStyle = "rgb(255,0,0)";
		}
		else if(level == 2) {
			ctx.font = "30px Arial";
			if(zColor[0][0] == 0) {
				ctx.fillStyle = "rgb(255,255,255)";
			}
			else {
				ctx.fillStyle = "rgb(0,0,0)";
			}
			ctx.fillText("Zoom Outs Used: " + Math.floor(timesZoomed/2),5,40);
			ctx.fillStyle = "rgb(0,255,0)";
		}
		else if(level == 3) {
			ctx.font = "20px Arial";
			if(zColor[0][0] == 0) {
				ctx.fillStyle = "rgb(255,255,255)";
			}
			else {
				ctx.fillStyle = "rgb(0,0,0)";
			}
			ctx.fillText("Zoom Outs Used: " + Math.floor(timesZoomed/2),5,28);
			ctx.fillStyle = "rgb(0,0,255)";
		}
		ctx.fillRect(zBlocksX[1],zBlocksY[1],cv.width/3,cv.height/3);
	}
	moved = false;
}

window.addEventListener("resize", setup);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
addEventListener("keydown", function (e) {
	keysDown[e.key] = true;
	if(level >= 1 && level <= 3) {
		if (" " in keysDown) {
			if(level == 1) {
				setZoom();
			}
			else if(level == 2) {
				if(timesZoomed < 11) {
					timesZoomed++;
					setZoom();
				}
			}
			else if(level == 3) {
				if(timesZoomed < 7) {
					timesZoomed++;
					setZoom();
				}
			}
		}
	}
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.key];
}, false);

setup();
setInterval(draw, 10);