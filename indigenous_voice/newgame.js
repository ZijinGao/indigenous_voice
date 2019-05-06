var theCanvas;
// var sweetgrassAliveArray = [
// [true, true, true, true,true,true],
// [true, true, true, true,true,true],
// [true, true, true, true,true,true],
// [true, true, true, true,true,true]];

var sweetgrassAliveArray = [
[true, true, true, true],
[true, true, true, true],
[true, true, true, true],
[true, true, true, true]];


// var sweetgrassPosX = [100,228,356,484,612,740];
var sweetgrassPosX = [100,228,356,484];
var sweetgrassPosY = [150,278,406,534];



var theGrass = [];
var millisecond;//30 seconds in total
var time;

// gameState = 0: game
// gameState = 1: end
// gameState = -1: not started
var gameState = 0;

var addGrassInterval = 5000;
var grassGrow;
// var grassGrow = setInterval(addGrass, addGrassInterval);

var game_background1;
var game_background2;
var bg;
var basket;
var sweetgrass;
var braid;

var mowing;
var twinkle;
var sweetgrass_intro;

var grassCount = 0;
var braidCount = 0;
var twinkleSoundCount = 0;
var tintDegree;


function preload(){
	game_background1 = loadImage("assets/images/game_background.jpg");
	game_background2 = loadImage("assets/images/game_background_after_game.png");
	basket = loadImage("assets/images/basket.png");
	sweetgrass = loadImage("assets/images/sweetgrass.png");
	braid = loadImage("assets/images/braid.png");

	mowing = loadSound("assets/audios/mowingSound.wav");
	twinkle = loadSound("assets/audios/twinkle.wav");
	sweetgrass_intro = loadSound("assets/audios/sweetgrass_intro.mp3");
}

function setup(){
	console.log(sweetgrassAliveArray[2]);
	theCanvas =  createCanvas(1024,768);
	bg = game_background1;

	theCanvas.style('z-index', '-1');
	theCanvas.parent("#container");

	sweetgrass_intro.play();

	for(var i = 0; i <= 3; i ++){ //initial sweetgrass 
		for (var j = 0; j <= 3; j++) {
			theGrass.push(new Grass(i, j));
		}
	}
	// for(var i = 0; i <= 3; i ++){ // last line
	// 	theGrass.push(new Grass(i, 2));
	// }
	console.log(theGrass.length);

}

function draw(){

	millisecond = millis();
	image(bg,width/2,height/2);
	for (var i = 0; i <= 3; i++) {
		for(var j = 0; j <= 3; j++){
			// console.log(sweetgrassAliveArray[i][j] );
			if (sweetgrassAliveArray[i][j] ) {
				theGrass[j * 4 + i].displaygrass();
			}
		}
	}

	// for (var i = 0; i <= theGrass.length - 1; i++) {
	// 	theGrass[i].displaygrass();
	// }

	if (gameState == -1) {
		//play the intro audio and display the original photo

		if (! sweetgrass_intro.isPlaying()) {
			gameState = 0;
		}
	}

	if (gameState == 0) {

		var grassGrow = setInterval(addGrass, addGrassInterval);

		// for (var i = 0; i <= theGrass.length - 1; i++){
		// 	theGrass[i].displaygrass();
		// 	if (theGrass[i].alive == false) {
		// 		theGrass.splice(i,1);
		// 		i = i - 1;
		// 	}
		// }	
		// imageMode(CENTER);
		// image(basket, mouseX, mouseY);
		// displayProgress();
		// displayBraid();
	}
	image(basket, mouseX, mouseY);


}

function addGrass(){
	// theGrass.push(new Grass(random(width), random(height) *3/4 + height / 4 ));
}

function mouseClicked(){
	if (gameState == 0) {
		// for (var i = 0; i <= theGrass.length - 1; i++) {
		for(var i = 0; i <= 3; i ++){
			for(var j = 0; j <= 3; j ++){
				if (theGrass[j*4+i].x - 50 < mouseX && theGrass[j*4+i].x + 50 > mouseX && theGrass[j*4+i].y - 50 < mouseY && theGrass[j*4+i].y + 50 > mouseY) {
					sweetgrassAliveArray[theGrass[j*4+i].indexX][theGrass[j*4+i].indexY] = false;
					console.log(sweetgrassAliveArray[theGrass[j*4+i].indexX], sweetgrassAliveArray[theGrass[j*4+i].indexY]);
					grassCount -= 1;
					twinkleSoundCount += 1;
					braidCount = floor(grassCount / 10);
					mowing.play();
				}
			}
		// }
		}
	}
	else if (gameState == 1) {
		bg = game_background2;

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
	text( time-34, width-135, 30);
}

function displayBraid(){
	imageMode(CENTER);
	for (var i = 0; i <= braidCount; i++) {
		image(braid, 100 + i * 60, height - 130);
	}
}


class Grass{

	constructor(indexX, indexY){
		this.indexX = indexX;
		this.indexY = indexY;
		this.x = indexX * width/8 + 100;
		this.y = indexY * height / 6 + 150
		this.alive = true;

	}

	displaygrass(){
		imageMode(CENTER);
		image(sweetgrass, this.x, this.y, 100,100);

	}
}

function checkEnd(){
	if (time == 0) {
		if (theGrass.length > 5) { // to much sweetgrass left
			textAlign(CENTER);
			text("too much", width/2, height/2);
			gameState = 1;
		}
		else{
			textAlign(CENTER);
			text("good job!", width/2, height/2);
		}
	}
}

function showBack(){
	document.getElementById("backButton").style.display = "block";
}

function back(){
	window.close();
}