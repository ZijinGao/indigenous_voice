var you_are_here;



function preload() { 

	you_are_here = loadImage('assets/images/you_are_here.png');

}

function setup(){
	theCanvas = createCanvas(1024,768);

	image(you_are_here,0 ,0);
	
	theCanvas.style('z-index', '-1');
	theCanvas.parent("container");
}