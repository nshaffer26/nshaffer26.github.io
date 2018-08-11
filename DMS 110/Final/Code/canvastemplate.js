var cv = document.getElementById("canvas");
var ctx = cv.getContext("2d");


var winMusic = document.getElementById("win");
var playedWin = false;
var music = document.getElementById("music");
var musicOn = false;


var mouseX, mouseY;

var keysDown = {};


var level = 0; //Start=0,Instructions=0.5,Win=4, Easy=1,Medium=2,Hard=3


//Maze
var width;
var height;

var bWidth;
var bHeight;
var path = [];
var directions = [];
var mazeSetup = [];
var maze = [];

var spacers;

var initial = true;
var zoomed = false;
var timesZoomed;
var moved = false;
//Start
var currentC = 0;
var currentR = 1;
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
	else if(level == 4) {
		if(initial) {
			level4();
			initial = false;
		}
	}
	
	if(currentC == width-1 && currentR == height-2) {
		level = 5;
		win();
	}
}

/*Event Functions*/
function mouseDown() {
	if(level == 0) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-200 && mouseY <= cv.height/2-150) {
			level = 1;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-135 && mouseY <= cv.height/2-85) {
			level = 2;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-70 && mouseY <= cv.height/2-20) {
			level = 3;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2-5 && mouseY <= cv.height/2+45) {
			level = 4;
		}
		else if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+90 && mouseY <= cv.height/2+140) {
			level = 0.5;
		}
		else if(mouseX >= cv.width/2+30 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+150 && mouseY <= cv.height/2+200) {
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
	else if(level >= 1 && level <= 4) {
		if(zoomed) {
			//Mouse
			if(mouseX >= cv.width/3 && mouseX <= 2*cv.width/3 && mouseY >= 0 && mouseY <= cv.height/3) {
				//Up
				if(zColor[0][1] == 255) {
					currentR--;
					moved = true;
					setZoom();
				}
			}
			else if(mouseX >= cv.width/3 && mouseX <= 2*cv.width/3 && mouseY >= 2*cv.height/3 && mouseY <= cv.height) {
				//Down
				if(zColor[2][1] == 255) {
					currentR++;
					moved = true;
					setZoom();
				}
			}
			else if(mouseX >= 0 && mouseX <= cv.width/3 && mouseY >= cv.height/3 && mouseY <= 2*cv.height/3) {
				//Left
				if(zColor[1][0] == 255) {
					currentC--;
					moved = true;
					setZoom();
				}
			}
			else if(mouseX >= 2*cv.width/3 && mouseX <= cv.width && mouseY >= cv.height/3 && mouseY <= 2*cv.height/3) {
				//Right
				if(zColor[1][2] == 255) {
					currentC++;
					moved = true;
					setZoom();
				}
			}
		}
	}
	else if(level == 5) {
		if(mouseX >= cv.width/2-75 && mouseX <= cv.width/2+75 && mouseY >= cv.height/2+20 && mouseY <= cv.height/2+70) {
			level = 0;
			playedWin = false;
			initial = true;
			zoomed = false;
			moved = false;
			currentC = 0;
			currentR = 1;
			path = [];
			directions = [];
			mazeSetup = [];
			maze = [];
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
	ctx.rect(cv.width/2-150,cv.height/2-250,300,500);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255)";
	//Easy
	ctx.rect(cv.width/2-75,cv.height/2-200,150,50);//165
	//Medium
	ctx.rect(cv.width/2-75,cv.height/2-135,150,50);//95
	//Hard
	ctx.rect(cv.width/2-75,cv.height/2-70,150,50);//25
	//Expert
	ctx.rect(cv.width/2-75,cv.height/2-5,150,50);//25
	//Instructions
	ctx.rect(cv.width/2-75,cv.height/2+90,150,50);//60
	//Sound
	ctx.rect(cv.width/2-75,cv.height/2+150,150,50);//120
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.moveTo(cv.width/2+30,cv.height/2+150);
	ctx.lineTo(cv.width/2+30,cv.height/2+200);
	ctx.stroke();
	ctx.closePath();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("          Easy",cv.width/2-75,cv.height/2-167);
	ctx.fillText("        Medium",cv.width/2-75,cv.height/2-102);
	ctx.fillText("          Hard",cv.width/2-75,cv.height/2-37);
	ctx.fillText("        Expert",cv.width/2-75,cv.height/2+28);
	ctx.fillText("    Instructions",cv.width/2-75,cv.height/2+123);
	if(!musicOn) {
		ctx.fillText("     Music      Off",cv.width/2-75,cv.height/2+183);
	}
	else {
		ctx.fillText("     Music      On",cv.width/2-75,cv.height/2+183);
	}
}

function instructions() {
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.lineWidth = 5;

	ctx.fillStyle = "rgb(220,220,220)";
	ctx.rect(cv.width/2-300,cv.height/2-250,600,500);
	ctx.stroke();
	ctx.fill();

	ctx.font = "20px Arial";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillText("Instructions:",cv.width/2-290,cv.height/2-225);
	ctx.fillText("Your goal is to get to the end of the maze. You will be able to see",cv.width/2-290,cv.height/2-205);
	ctx.fillText("the whole maze at the beginning of the level. To start moving, hit",cv.width/2-290,cv.height/2-185);
	ctx.fillText("the space bar to zoom in on your current location. You can",cv.width/2-290,cv.height/2-165);
	ctx.fillText("continue to \"peek\" at the rest of the maze throughout the game",cv.width/2-290,cv.height/2-145);
	ctx.fillText("using the space bar, but you can only move if you are zoomed in.",cv.width/2-290,cv.height/2-125);
	//Line break
	ctx.fillText("To move, click a white block adjacent to your current location, or",cv.width/2-290,cv.height/2-85);
	ctx.fillText("use the arrow keys.",cv.width/2-290,cv.height/2-65);
	//Line break
	ctx.fillText("To start a game, select a difficulty. There are 4 difficulties, and",cv.width/2-290,cv.height/2-25);
	ctx.fillText("their rules are as follows:",cv.width/2-290,cv.height/2-5);
	//Line break
	ctx.fillText("   Easy - Peek at the whole maze as many times as you'd like.",cv.width/2-290,cv.height/2+35);
	ctx.fillText("     This will be the smallest maze of the 4 difficulties.",cv.width/2-290,cv.height/2+55);
	//Line break
	ctx.fillText("   Medium - You can only peek 3 times throughout the duration",cv.width/2-290,cv.height/2+95);
	ctx.fillText("     of the maze. This will be a medium sized maze.",cv.width/2-290,cv.height/2+115);
	//Line break
	ctx.fillText("   Hard - You can only peek 3 times. This will be the 3rd largest",cv.width/2-290,cv.height/2+155);
	ctx.fillText("     maze.",cv.width/2-290,cv.height/2+175);
	//Line break
	ctx.fillText("   Expert - You can only peek 2 times. Use them wisely! This",cv.width/2-290,cv.height/2+215);
	ctx.fillText("     will be the largest maze.",cv.width/2-290,cv.height/2+235);

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

function level1() {
	ctx.strokeStyle = "rgb(255,255,255)";
	genMaze(24,12);
	drawMaze();
}

function level2() {
	ctx.strokeStyle = "rgb(255,255,255)";
	timesZoomed = 7;
	genMaze(52,26);
	drawMaze();
}

function level3() {
	ctx.strokeStyle = "rgb(255,255,255)";
	timesZoomed = 7;
	genMaze(64,32);
	drawMaze();
}

function level4() {
	ctx.strokeStyle = "rgb(255,255,255)";
	timesZoomed = 5;
	genMaze(128,64);
	drawMaze();
}

function genMaze(w,h) {
	width = w;
	height = h;
	bWidth = cv.width/width;
	bHeight = cv.width/width;

	for(var i = 0; i < height; i++) {
		maze[i] = new Array(width);
	}
	for(var i = 0; i < height; i++) {
		for(var j = 0; j < width; j++) {
			maze[i][j] = 0;
		}
	}

	for(var i = 0; i < height/2; i++) {
		mazeSetup[i] = new Array(width/2);
	}
	for(var i = 0; i < height/2; i++) {
		for(var j = 0; j < width/2; j++) {
			mazeSetup[i][j] = false;
		}
	}
	setPath(0,0);
	createMaze();
	//Create border around maze:
	maze.push(new Array(width));
	for(var i = 0; i < maze[maze.length-1].length; i++) {
		maze[maze.length-1][i] = 0;
	}
	for(var i = 0; i < maze.length; i++) {
		maze[i].splice(0,0,0);
	}
	width++;
	height++;
	//Entrance/Exit:
	maze[1][0] = 255;
	maze[maze.length-2][maze[0].length-1] = 255;

	bWidth = cv.width/(width);
	bHeight = cv.width/(width);

	spacers = ((cv.height - (height * bHeight)) / 2);
}
function drawMaze() {
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,cv.width,cv.height);
	ctx.font = "30px Arial";
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillText("Level: " + level,cv.width-120,spacers/2+15);
	if(level != 1) {
		ctx.fillText("Peeks Left: " + Math.floor(timesZoomed/2),15,spacers/2+15);
	}
	//Draw Maze
	for(var i = 0; i < width; i++) {
		for(var j = 0; j < height; j++) {
			if(i == currentC && j == currentR) {
				ctx.fillStyle = "rgb(0,0,255)";
			}
			else {
				ctx.fillStyle = "rgb(" + maze[j][i] + "," + maze[j][i] + "," + maze[j][i] + ")";
			}
			// ctx.strokeStyle = "rgb(255,255,255)";
			ctx.lineWidth = 0.5;
			ctx.beginPath();
			ctx.rect(i*bWidth,spacers+j*bHeight,bWidth,bHeight);
			ctx.fill();
			// ctx.stroke();
			ctx.closePath();
		}
	}
}
function setPath(r,c) {
	path.push([r,c]);
	mazeSetup[r][c] = true;
	var temp = findMoves(r,c);
	if(temp.length == 0) {
		if(r != 0 || c != 0) {
			for(var i = path.length-1; i > 0; i--) {
				if(findMoves(path[i][0],path[i][1]).length != 0) {
					directions.push(-1);
					return setPath(path[i][0],path[i][1]);
				}
			}
		}
		else {
			return;
		}
	}
	else {
		var direction = temp[Math.floor(Math.random() * temp.length)];
		directions.push(direction);
		if(direction == 0) {
			//Go up
			return setPath(r-1,c);
		}
		else if(direction == 1) {
			//Go right
			return setPath(r,c+1);
		}
		else if(direction == 2) {
			//Go down
			return setPath(r+1,c);
		}
		else if(direction == 3) {
			//Go left
			return setPath(r,c-1);
		}
	}
}
function findMoves(r,c) {
	var moves = [];
	//Up = 0, Right = 1, Down = 2, Left = 3
	if(r != 0 && mazeSetup[r-1][c] == false) {
		//Can go up
		moves.push(0);
	}
	if(c != width/2-1 && mazeSetup[r][c+1] == false) {
		//Can go right
		moves.push(1);
	}
	if(r != height/2-1 && mazeSetup[r+1][c] == false) {
		//Can go down
		moves.push(2);
	}
	if(c != 0 && mazeSetup[r][c-1] == false) {
		//Can go left
		moves.push(3);
	}
	return moves;
}

function createMaze() {
	for(var i = 0; i < path.length; i++) {
		maze[path[i][0]*2+1][path[i][1]*2] = 255;
		if(directions[i] == 0) {
			//Went up
			maze[path[i][0]*2+1-1][path[i][1]*2] = 255;
		}
		else if(directions[i] == 1) {
			//Went right
			maze[path[i][0]*2+1][path[i][1]*2+1] = 255;
		}
		else if(directions[i] == 2) {
			//Went down
			maze[path[i][0]*2+1+1][path[i][1]*2] = 255;
		}
		else if(directions[i] == 3) {
			//Went left
			maze[path[i][0]*2+1][path[i][1]*2-1] = 255;
		}
		else {
			continue;
		}
	}
}

function setZoom() {
	if(currentC == 0 && currentR == 1) {
		zColor[0][0] = 0;
		zColor[1][0] = 0;
		zColor[2][0] = 0;
		zColor[0][1] = maze[currentR-1][currentC];
		zColor[1][1] = maze[currentR][currentC];
		zColor[2][1] = maze[currentR+1][currentC];
		zColor[0][2] = maze[currentR-1][currentC+1];
		zColor[1][2] = maze[currentR][currentC+1];
		zColor[2][2] = maze[currentR+1][currentC+1];
	}
	else {
		zColor[0][0] = maze[currentR-1][currentC-1];
		zColor[1][0] = maze[currentR][currentC-1];
		zColor[2][0] = maze[currentR+1][currentC-1];
		zColor[0][1] = maze[currentR-1][currentC];
		zColor[1][1] = maze[currentR][currentC];
		zColor[2][1] = maze[currentR+1][currentC];
		zColor[0][2] = maze[currentR-1][currentC+1];
		zColor[1][2] = maze[currentR][currentC+1];
		zColor[2][2] = maze[currentR+1][currentC+1];
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
		ctx.font = "30px Arial";
		if(level != 1) {
			if(zColor[0][0] == 0) {
				ctx.fillStyle = "rgb(255,255,255)";
			}
			else {
				ctx.fillStyle = "rgb(0,0,0)";
			}
			ctx.fillText("Peeks Left: " + Math.floor(timesZoomed/2),15,spacers/2+15);
		}
		if(zColor[0][2] == 0) {
			ctx.fillStyle = "rgb(255,255,255)";
		}
		else {
			ctx.fillStyle = "rgb(0,0,0)";
		}
		ctx.fillText("Level: " + level,cv.width-120,spacers/2+15);
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(zBlocksX[1],zBlocksY[1],cv.width/3,cv.height/3);
	}
	moved = false;
}

window.addEventListener("resize", setup);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
addEventListener("keydown", function (e) {
	keysDown[e.key] = true;
	if(level >= 1 && level <= 4) {
		if (" " in keysDown) {
			if(level == 1) {
				setZoom();
			}
			else {
				if(timesZoomed > 0) {
					timesZoomed--;
					setZoom();
				}
			}
		}
	}
	if(zoomed) {
		//Arrow Keys
		if (e.keyCode == '38') {
    		//Up
    		if(zColor[0][1] == 255) {
				currentR--;
				moved = true;
				setZoom();
			}
	    }
	    else if (e.keyCode == '40') {
	        //Down
	        if(zColor[2][1] == 255) {
				currentR++;
				moved = true;
				setZoom();
			}
	    }
	    else if (e.keyCode == '37') {
	       //Left
	       if(zColor[1][0] == 255) {
				currentC--;
				moved = true;
				setZoom();
			}
	    }
	    else if (e.keyCode == '39') {
	       //Right
	       if(zColor[1][2] == 255) {
				currentC++;
				moved = true;
				setZoom();
			}
	    }
	}
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.key];
}, false);

setup();
setInterval(draw, 10);