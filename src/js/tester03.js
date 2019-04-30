var color = true;
var particle_number = 6000;
var melting_rate = 60/1000;

// var min_radius = 10;

window.onload = function() {
	  
// Get canvas.
var canvas = document.getElementById("drawable");

// Get canvas context.
var canvas_ctx = canvas.getContext('2d');

// Set size.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var center_x =  canvas.width / 2;
var center_y =  canvas.height / 2;
		
var min_x = center_x - 500;
var max_x = center_x;
var max_y = center_y - 200;

var radius = 15;

// Generate particles
var particles = [];
GenerateParticles( particle_number );
	  
// OBJECTS
function Particle(){
	this.angle = Math.random() * 2 * Math.PI;

	this.r = radius;
	this.x = max_x + Math.sin(this.angle) * (this.r * 0.5);
	this.y = max_y + Math.cos(this.angle) * (this.r * 0.5);
	// this.x = center_x;
	// this.y = center_y * Math.sin(this.angle);
	    
	this.color = '#f2c0ce';
			
	this.Move = function(){
	      
		// Update coordinates
	    if (this.y > 600) {
	    	this.y = this.y
	    } 
	    else if (this.y > 200) {
	    	this.y += Math.random() * 1.5;
	    } 
	    else {
	    	this.y += Math.random() * 0.0001;
	    }
	    if (this.x > 750 && this.y > 600) {
	    	this.x += Math.random(max_x) * 0.5;
	    } else if (this.x < 750 && this.y > 600) {
	    	this.x -= Math.random(max_x) * 0.5;
	    }
	}
}

	  // FUNCTIONS
function UpdateCanvas() {

	ClearBackground();
	UpdateParticles();
	    
}

function ClearBackground() {
	canvas_ctx.fillStyle = "rgb(255, 247, 230)";
	canvas_ctx.fillRect( 0, 0, canvas.width, canvas.height );
}
	  
function UpdateParticles(){
	drawEmitterParticle();
	for( var index in particles ){
	  	particles[index].Move();
	    DrawParticle(particles[index]);
	}
}

function drawEmitterParticle(){
    canvas_ctx.beginPath();
    canvas_ctx.fillStyle = '#f2c0ce';
	canvas_ctx.arc(max_x, max_y, 150, 0, Math.PI*2); 
    canvas_ctx.fill();
}	  

function DrawParticle(particle){
    canvas_ctx.beginPath();
    canvas_ctx.fillStyle = particle.color;
	canvas_ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI*2); 
    canvas_ctx.fill();
}
	  
function GenerateParticles( num_particles ){
	for( var i = 0; i < num_particles; i++ ){
	    particles.push( new Particle() );
	}
	    
	setInterval( UpdateCanvas, melting_rate );
	}
	   
}



