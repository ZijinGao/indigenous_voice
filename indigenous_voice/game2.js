
var theCanvas;

var image_on_display;
var outcomeImage;

var info_photo;
var quiz_photo;
var choiceA_photo;
var choiceB_photo;
var choiceC_photo;
var outcomes;

// gameState = 0, info_photo
// gameState = 1, quiz_photo
// gameState = 2, outcomes
var gameState = 0;


function preload(){
	info_photo = loadImage("assets/images/info_photo.png");
	quiz_photo = loadImage("assets/images/quiz_photo.png");
	choiceA_photo = loadImage("assets/images/choiceA_photo.png");
	choiceB_photo = loadImage("assets/images/choiceB_photo.png");
	choiceC_photo = loadImage("assets/images/choiceC_photo.png");
	outcomes = [choiceA_photo, choiceB_photo, choiceC_photo];
}

function setup(){
	theCanvas =  createCanvas(1024,768);
	theCanvas.style('z-index', '-1');
	theCanvas.parent("container");

}

function draw(){
	if (gameState == 0) { // info photo
		image_on_display = info_photo;
	}
	else if (gameState == 1) { // quiz photo
		image_on_display = quiz_photo;
	}
	else if (gameState == 2) {
		image_on_display = outcomeImage;
	}

	image(image_on_display,0 ,0); 

}

function showQuiz(){
	gameState = 1;
	document.getElementById("infoToQuiz").style.display = "none";
	document.getElementById("choiceA").style.display = "block";
	document.getElementById("choiceB").style.display = "block";
	document.getElementById("choiceC").style.display = "block";
}

function showOutcome(number){
	gameState = 2
	outcomeImage = outcomes[number - 1];
	document.getElementById("choiceA").style.display = "none";
	document.getElementById("choiceB").style.display = "none";
	document.getElementById("choiceC").style.display = "none";
	document.getElementById("backToQuiz").style.display = "block";
}

function backToQuiz(){
	gameState = 1;
	document.getElementById("infoToQuiz").style.display = "none";
	document.getElementById("choiceA").style.display = "block";
	document.getElementById("choiceB").style.display = "block";
	document.getElementById("choiceC").style.display = "block";
	document.getElementById("backToQuiz").style.display = "none";
}

function showBack(){
	document.getElementById("backButton").style.display = "block";
}

function back(){
	window.close();
}