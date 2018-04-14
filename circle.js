var canvas = document.querySelector('canvas');
canvas.setAttribute("width", screen.availWidth);
canvas.setAttribute("height", screen.availHeight);
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y:undefined
	}
var keyboard = {
	keydown: false
}
var colourArrayOne = ['#be1e2d','#dd4c2f','#d86f05','#fbab40','#c3996b'];
var colourArrayTwo = ['#2C3E50','#E74C3C','#ECF0F1','#3498DB','#2980B9'];
var colourArrayThree = ['#2E112D','#540032','#820333','#C9283E','#F0433A'];
var colourArrayFour = ['#111930','#163540','#FFBD2B','#FF6B03','#7B1323'];
var colourArrayFive = ['#4D2F37','#ECC06B','#58712D','#233315','#C8753B'];
var palettes = [colourArrayOne,colourArrayTwo,colourArrayThree,colourArrayFour,colourArrayFive];

var paletteNum = Math.floor(Math.random()*4);
// events
window.addEventListener('mousemove', function(event){
mouse.x = event.x;
mouse.y = event.y;
});
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});
window.addEventListener('click', function(){
	paletteNum++;
	paletteNum%=5;
	init();
});
window.addEventListener('keydown', function(){
	keyboard.keydown = true;
});
window.addEventListener('keyup', function(){
	keyboard.keydown = false;
});


//circle object
function Circle(x, y, radius, dx, dy, palette){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.maxRadius = Math.random()*50+1;
	this.minRadius = radius;
	this.dx = dx;
	this.dy = dy;
	this.colour = palette[Math.floor(Math.random()*4)];
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = this.colour;
		c.fill();
		}
		//stops circles from spawning at edges and getting stuck
	this.update = function(){
		if(this.x+this.radius>innerWidth || this.x-this.radius<0){
			this.dx = -this.dx;
		}
		if(this.y+this.radius>innerHeight || this.y-this.radius<0){
			this.dy = -this.dy;
		}
		//movement
		this.x += this.dx;
		this.y += this.dy;
		//interaction
		if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50){
			if(this.radius<this.maxRadius)this.radius+=2;
		}
		else if(this.radius>this.minRadius){
			this.radius--;
		}

		if(keyboard.keydown==true){
			this.colour = palette[Math.floor(Math.random()*4)];
		}

		this.draw();
	}
}

var cirArray = [];
//dynamically resizes page
function init() {
	//makes array of circle objects
	cirArray = [];
	for(var i=0;i<800;i++){
		var radius = Math.random()*5+1;
		var x = Math.random()*(window.innerWidth-radius*2)+radius;
		var y = Math.random()*(window.innerHeight-radius*2)+radius;
		var dx = (Math.random()-0.5)*5;
		var dy = (Math.random()-0.5)*5;
		var palette = palettes[paletteNum];
		cirArray.push(new Circle(x,y,radius,dx,dy,palette));
	}

}

init();

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);

	for(var i=0;i<cirArray.length;i++){
		cirArray[i].update();
		}
	}

animate();