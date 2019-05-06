var guiding_page;
var people_shape;
var theme_photo;


function preload() { 

	theme_photo = loadImage('assets/images/theme_photo.png');
	people_shape = loadSound("assets/audios/people_shape.mp3");

}

function setup(){
	theCanvas = createCanvas(1024,768);

	image(theme_photo,0 ,0);
	
	theCanvas.style('z-index', '-1');
	theCanvas.parent("container");

	people_shape.play();
}

function draw(){
	if (! people_shape.isPlaying()) {
		goToMain();
	}
}

function goToMain(){
	window.location.href = "main.html";
}



