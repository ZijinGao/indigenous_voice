var guiding_page;



function preload() { 

	guiding_page = loadImage('assets/images/guiding_page.png');

}

function setup(){
	theCanvas = createCanvas(1024,768);

	image(guiding_page,0 ,0);
	
	theCanvas.style('z-index', '-1');
	theCanvas.parent("container");
}



