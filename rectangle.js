var canvas = document.querySelector('canvas');
canvas.setAttribute("width", screen.availWidth);
canvas.setAttribute("height", screen.availHeight);
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y:undefined,
	down:false
}
var keyboard = {
	keydown: false
}

var colourArray = ['#FF4F00','#00A963','#FFD819','#FF496F','#0080B6'];

// events
window.addEventListener('mousedown', function(){
mouse.down = true;
});
window.addEventListener('mouseup', function(){
mouse.down = false;
});
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});
window.addEventListener('keydown', function(){
	keyboard.keydown = true;
});
window.addEventListener('keyup', function(){
	keyboard.keydown = false;
});

//rectangle object
function Rectangle(x, y, width, height, dx, dy){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.maxWidth = (Math.random()+1)*100;
	this.maxHeight = (Math.random()+1)*100;
	this.minWidth = width;
	this.minHeight = height;
	this.dx = dx;
	this.dy = dy;
	this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];
	this.draw = function(){
		c.fillStyle = this.colour;
		c.fillRect(this.x,this.y,this.minWidth,this.minHeight)
		}
		//stops shapes from spawning at edges and getting stuck
	this.update = function(){
		if(this.x+((this.width)/2)>innerWidth || this.x-((this.width)/2)<0){
			this.dx = -this.dx;
		}
		if(this.y+((this.height)/2)>innerHeight || this.y-((this.height)/2)<0){
			this.dy = -this.dy;
		}
		//interaction
		var slowX = this.dx-(this.dx-.01);
		var slowY = this.dx-(this.dy-.01);
		var fastX = this.dx*3;
		var fastY = this.dy*3;
		//speeds up when mouse is down
		if(mouse.down==true){
			this.x+=fastX;
			this.y+=fastY;
			this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];
		}
		else if(mouse.down==false){
			this.x += this.dx;
			this.y += this.dy;
		}
		//slows down when a key is pressed
		if(keyboard.keydown==true){
			this.x+=slowX;
			this.y+=slowY;
			}
		else if(keyboard.keydown==false){
			this.x += this.dx;
			this.y += this.dy;
		}

		this.draw();
	}
}

var rectArray = [];
//dynamically resizes page
function init() {
	//makes array of rectangle objects
	rectArray = [];
	for(var i=0;i<150;i++){
		var width = (Math.random()+1)*10;
		var height = (Math.random()+1)*10;
		var x = Math.random()*(innerWidth-(width/2)*2)+(width/2);
		var y = Math.random()*(innerHeight-(height/2)*2)+(height/2);
		var dx = (Math.random()-0.5)*5;
		var dy = (Math.random()-0.5)*5;
		rectArray.push(new Rectangle(x,y,width,height,dx,dy));
	}

}

init();

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

	for(var i=0;i<rectArray.length;i++){
		rectArray[i].update();
		}
	}

animate();