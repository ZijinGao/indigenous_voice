//wigwam-keepout: (25,444 - 387,738)
//machinery: (430, 270 - 1018, 732)

//fire: (363, 360 - 1020,750)
//wigwam: (22,435 - 345,721)
var theCanvas;
var millisecond;

var image_right;
var image_copied;

//sound assets
var past_intro;
var now_intro;
var wigwam_sound;
var flame_sound;
var keepout_sound;
var machinery_sound;

//photos
var now;
var now_indicated_all;
var now_indicated_keepout;
var now_indicated_machinery;

var past;
var past_indicated_all;
var past_indicated_wigwam;
var past_indicated_fire;
var wigwam_video;

var arrow_right;

var lineX = 800;
var ellipseX = 800;
var barMoveBuffer = 5;
var firstAtRight = 0;
var firstAtLeft = 0;
var pastOn = false;
var nowOn = false;

//initial state
var state = 0;
var wigwamClicked = false;
var fireClicked = false;
var cornClicked = false;
var machineryClicked = false;
var keepoutClicked = false;

// state = 1: bar to the right, showing all "past"
// state = 2: bar to the left, showing all "now"

// state = 3: bar to the right, past; wigwam was clicked
// state = 4: bar to the right, past; fire was clicked
// state = 5: bar to the left, now; keepout was clicked
// state = 6, bar to the left, now; machinery was clicked

// state = 7, var to the right, past; corn was clicked

function preload() { 

	now = loadImage('assets/images/now_with_all.png');
	now_theme = loadImage("assets/images/now_theme.png");
	now_indicated_all= loadImage('assets/images/now_indicated_all.png');
	now_indicated_keepout= loadImage('assets/images/now_indicated_keepout.png');
	now_indicated_machinery= loadImage('assets/images/now_indicated_machinery.png');

	past = loadImage('assets/images/past_with_all.png');
	past_theme = loadImage("assets/images/past_theme.png");
	past_indicated_all = loadImage('assets/images/past_indicated_all.png');
	past_indicated_wigwam = loadImage('assets/images/past_indicated_wigwam.png');
	past_indicated_fire = loadImage('assets/images/past_indicated_fire.png');
	past_indicated_corn = loadImage('assets/images/past_indicated_corn.png');
	wigwam_video = loadImage("assets/images/wigwam_video.png");

	arrow_right = loadImage("assets/images/arrow_right.png");
	wigwam_sound = loadSound("assets/audios/wigwam_sound.wav");
	flame_sound = loadSound("assets/audios/flame_sound1.wav");
	keepout_sound = loadSound("assets/audios/keepout_sound.wav");
	machinery_sound = loadSound("assets/audios/machinery_sound.wav");

	past_intro = loadSound("assets/audios/past_intro.mp3");
	now_intro = loadSound("assets/audios/now_intro.mp3");

}

function setup(){
	theCanvas = createCanvas(1024,768);
	rightinfoX = width;
	image_right = now;
	image_copied = past;

	theCanvas.style('z-index', '-1');
	theCanvas.parent("container");

	// past_intro.play();
}

function draw(){

	millisecond = millis();

	image(image_right, 0, 0);


	if (mouseIsPressed) {

		if (state == 0) {
			barMoveBuffer = 30;
		}
		else if (state ==1 || state == 2) {
			barMoveBuffer = 5;
		}

		if ( lineX - barMoveBuffer <= mouseX && mouseX <= lineX + barMoveBuffer) {
			updateLine();
		}

		//past
		if (state == 1) {
			if (mouseX >= 22 && mouseX <= 345 && mouseY >= 435 && mouseY <= 721) {
				image_copied = past_indicated_wigwam
				console.log("wigwam clicked");
			}
			else if (mouseX >= 363 && mouseX <= 800 && mouseY >= 360 && mouseY <= 750) {
				image_copied = past_indicated_fire;
				console.log("fire clicked");
			}
			else if (mouseX >= 800 && mouseX <= 1020 && mouseY >= 360 && mouseY <= 750) {
				image_copied = past_indicated_corn;
				console.log("corn clicked");
			}

		}

		//now
		if (state == 2) {
			if (mouseX >= 25 && mouseX <= 387 && mouseY >= 444 && mouseY <= 738) {
				image_right = now_indicated_keepout;
				console.log("keepout clicked");
			}
			else if (mouseX >= 430 && mouseX <= 1018 && mouseY >= 270 && mouseY <= 732) {
				image_right = now_indicated_machinery;
				console.log("machinery clicked");
			}
		}
	}

	showSliderContent();
	drawLine();

	if (millisecond < 16000) {
		image(arrow_right, lineX - 100, 100);
	}

	displayPastTheme(pastOn);
	displayNowTheme(nowOn);
	// displayPastTheme(pastOn);

}

function mouseReleased(){
	// console.log(mouseX,mouseY);
	changeState();
}

function changeState(){
	if (lineX == width){ //bar at to the right, past
		firstAtRight += 1;
		if (mouseX >= 22 && mouseX <= 345 && mouseY >= 435 && mouseY <= 721) {
			state = 3; // wigwam
			wigwamClicked = true;
			document.getElementById("videoButton").style.display = "block";
			if (wigwam_sound.isPlaying()) {
				wigwam_sound.stop();
			}else{
				wigwam_sound.play();
				flame_sound.stop();
				keepout_sound.stop();
				machinery_sound.stop();
			}
		}
		else if (mouseX >= 363 && mouseX <= 800 && mouseY >= 360 && mouseY <= 750) {
			document.getElementById("videoButton").style.display = "none";
			state = 4; // fire
			fireClicked = true;
			if (flame_sound.isPlaying()) {
				flame_sound.stop();
			}else{
				flame_sound.play();
				wigwam_sound.stop();
				keepout_sound.stop();
				machinery_sound.stop();
			}
		}
		else if (mouseX >= 800 && mouseX <= 1020 && mouseY >= 360 && mouseY <= 750) {
			document.getElementById("videoButton").style.display = "none";
			state = 7; // corn
			cornClicked = true;

			flame_sound.stop();
			wigwam_sound.stop();
			keepout_sound.stop();
			machinery_sound.stop();
			
		}
		// if (state == 3 && mouseX <= 475 && mouseX >= 10 && mouseY <= 415 && mouseY >= 97 ) {
		// 	window.open("https://www.google.com/");
		// }

		else{
			document.getElementById("videoButton").style.display = "none";
			state = 1;
			image_right = now;
			image_copied = past_indicated_all;
		}

	}
	else if (lineX > 0 && lineX < width) { // bar in the middle
		document.getElementById("videoButton").style.display = "none";
		state = 0;
		image_right = now;
		image_copied = past;

		// console.log("state: " + state);
	}
	else if (lineX == 0){ // bar to the left
		document.getElementById("videoButton").style.display = "none";
		firstAtLeft += 1;
		if (mouseX >= 25 && mouseX <= 387 && mouseY >= 444 && mouseY <= 738) {
			state = 5; // keepout
			keepoutClicked = true;
			if (keepout_sound.isPlaying()) {
				keepout_sound.stop();
			}else{
				keepout_sound.play();
				wigwam_sound.stop();
				flame_sound.stop();
				machinery_sound.stop();
			}
		}
		else if (mouseX >= 430 && mouseX <= 1018 && mouseY >= 270 && mouseY <= 732) {
			state = 6; // machinery
			machineryClicked = true;
			if (machinery_sound.isPlaying()) {
				machinery_sound.stop();
			}else{
				machinery_sound.play();
				wigwam_sound.stop();
				flame_sound.stop();
				keepout_sound.stop();
			}
		}
		else{
			state = 2;
			image_right = now_indicated_all;
			image_copied = now_indicated_all;	
		}
	}

	//
	if (fireClicked && wigwamClicked && cornClicked && state == 1) {
		setTimeout(showButton1, 3000);
	}
	else if ( fireClicked && wigwamClicked && cornClicked && (! state == 1) ) {
		document.getElementById("gameButton1").style.display = "none";
	}
	if (machineryClicked && keepoutClicked && state == 2) {
		setTimeout(showButton2, 3000);
	}
	else if ( fireClicked && wigwamClicked && (! state == 2) ) {
		document.getElementById("gameButton2").style.display = "none";
	}

	if (firstAtRight == 1) {
		pastOn = true;
	}else if (firstAtRight > 1) {
		pastOn = false;
	}
	
	if (firstAtLeft == 1) {
		nowOn = true;
	}else if (firstAtLeft > 1) {
		nowOn = false;
	}
}

function displayPastTheme(n){
	if (n) { //when true
		if (! past_intro.isPlaying()) { // is not playing
			past_intro.play();
			pastOn = false;
		}
	}
}

function displayNowTheme(n){
	if (n) { //when true
		if (! now_intro.isPlaying()) { // is not playing
			now_intro.play();
			nowOn = false;
		}
	}
}

function showButton1(){
	document.getElementById("gameButton1").style.display = "block";
}

function showButton2(){
	document.getElementById("gameButton2").style.display = "block";
}

function updateLine(){

	lineX = mouseX;
	ellipseX = mouseX;

	if (mouseX >= width) {

		lineX = width;

	}
	else if(mouseX <= 0){

		lineX = 0;
	}

	if (mouseX >= width - 30) {
		ellipseX = width - 30;
	}else if (mouseX <= 30) {
		ellipseX = 30;
	}
}

function drawLine(){
	strokeWeight(15);
	stroke(255,255,0);
	line(lineX, 0, lineX, height);

	fill(255,0,0);
	strokeWeight(1);
	ellipse(ellipseX,20,20,20);
}

function showSliderContent(){
	if (past_intro.isPlaying()) {
		image_copied = past_theme;
	}
	if (now_intro.isPlaying()) {
		image_copied = now_theme;
		image_right = now_theme;

	}
	copy(image_copied, 0, 0, lineX, height, 0, 0,lineX, height);
	
}

function checkPos(){
	text(mouseX, mouseX, mouseY - 10);
	text(mouseY, mouseX, mouseY + 10);
}

function openGame1(){
	window.open("game.html");
}

function openGame2(){
	window.open("game2.html");
}


