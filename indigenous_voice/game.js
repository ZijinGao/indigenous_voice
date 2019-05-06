var xPos;
var yPos;
var randx;
var randy;
var offsetX = 0;
var offsetY = 2000;
var theCanvas;

var theGrass = [];
var millisecond;//

var time;
var tintValue = 0;
// gameState = 0: game
// gameState = 1: end
// gameState = -1: not started
var gameState = -1;

var addGrassInterval = 1000;
var grassGrow = setInterval(addGrass, addGrassInterval);

//sound
var mowing;
var twinkle;
var sweetgrass_intro;

var basket; // at mouse position
var sweetgrass;
var sweetgrass_yellow;
var sweetgrass_display;
var sweetgrass_size = 100;
var braid;
var game_background1;
var game_background2; // the one after game is over
var game_background;
var bg; // the actual bg in use
var grassCount = 0; // grass remain
var grassGet = 0;

var braidCount = 0;
var twinkleSoundCount = 0;
var tintDegree;

function preload(){
	game_background1 = loadImage("assets/images/game_background.jpg");
	game_background2 = loadImage("assets/images/game_background_after_game.png");
	game_background = loadImage("assets/images/game_background_after_game.png");
	basket = loadImage("assets/images/basket.png");
	sweetgrass = loadImage("assets/images/sweetgrass.png");
	sweetgrass_yellow = loadImage("assets/images/sweetgrass_yellow.png");
	braid = loadImage("assets/images/braid.png");

	mowing = loadSound("assets/audios/mowingSound.wav");
	twinkle = loadSound("assets/audios/twinkle.wav");
	sweetgrass_intro = loadSound("assets/audios/sweetgrass_intro.mp3");

}

function setup(){
	noiseDetail(24);
	theCanvas =  createCanvas(1024,768);
	bg = game_background1;

	theCanvas.style('z-index', '-1');
	theCanvas.parent("#container");

	sweetgrass_intro.play();

}

function draw(){

	imageMode(CORNER);
	image(bg,0,0);
	millisecond = millis();
	console.log(theGrass.length);

	var randx = map(noise(offsetX),0,1,50, (width*3/4 + 50) );
	var randy = map(noise(offsetY),0,1,height/4, height );

	if (gameState == -1) {
		//play the intro audio and display the original photo
		if (! sweetgrass_intro.isPlaying()) {
			gameState = 0;
			addGrassInterval = 400;
		}
	}
	checkGrassNumber();
	if (gameState == 0) {
		for (var i = 0; i <= theGrass.length - 1; i++) {
			theGrass[i].displaygrass();
			if (theGrass[i].alive == false) {
				theGrass.splice(i,1);
				i = i - 1;
			}
		}	

		imageMode(CENTER);
		image(basket, mouseX, mouseY);
		displayProgress();
		displayBraid();
		notification();
	}
	
	checkEnd();
}

function notification(){
	fill(255,255,255);
	if (grassCount > 30) {
		text("keep harvesting!", width/2 - 100, height/2);
	}else if(grassCount <10){
		text("take only what you need!", width/2 - 100, height/2);
	}
}

function checkGrassNumber(){
	if (grassCount > 30) {
		sweetgrass_size = 100;
		sweetgrass_display = sweetgrass_yellow;
	}
	else if (grassCount < 10) {
		sweetgrass_size = 50;
		sweetgrass_display = sweetgrass;
	}
	else{
		sweetgrass_size = 100;
		sweetgrass_display = sweetgrass;
	}
}

function addGrass(){
	theGrass.push(new Grass( random(width)*3/4 +50, random(height) *3/4 + height / 4 ));
	// theGrass.push(new Grass( randx, randy ));

	grassCount += 1;

}

function mouseClicked(){

	if (gameState == 0) {
		for (var i = 0; i <= theGrass.length - 1; i++) {
			if (theGrass[i].x - 125 < mouseX && theGrass[i].x + 125 > mouseX && theGrass[i].y - 134 < mouseY && theGrass[i].y + 134 > mouseY) {
				theGrass[i].alive = false;
				grassCount -= 1;
				grassGet += 1;
				twinkleSoundCount += 1;
				braidCount = floor(grassGet / 10);
				mowing.play();
				console.log(twinkleSoundCount);

				if (twinkleSoundCount == 10) {
					twinkle.play();
					twinkleSoundCount = 0;
				}
			}	
		}
	}
	else if (gameState == 1) {
		bg = game_background;

		setTimeout(showBack, 3000);
	}
}

function displayProgress(){

	time = 80 - floor(millisecond / 1000);
	if (time <= 0) {
		time = 0;
	}

	fill(0,255,255);
	textSize(20);
	textAlign(CENTER);
	text( time, width-135, 30);
}

function displayBraid(){
	for (var i = 0; i <= braidCount; i++) {
		image(braid, 100 + i * 60, height - 130);
	}
}

class Grass{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.alive = true;
	}

	displaygrass(){

		imageMode(CENTER);
		image(sweetgrass_display, this.x, this.y,sweetgrass_size,sweetgrass_size );

	}
}

function checkEnd(){
	if (time == 0) {
		gameState = 1;
		// if (theGrass.length > 50) { // to much sweetgrass left
		// 	textAlign(CENTER);
		// 	text("too much", width/2, height/2);
		// 	gameState = 1;
		// }
		// else{
		// 	textAlign(CENTER);
		// 	text("good job!", width/2, height/2);
		// }
	}
}

function showBack(){
	document.getElementById("backButton").style.display = "block";
}

function back(){
	window.close();
}
