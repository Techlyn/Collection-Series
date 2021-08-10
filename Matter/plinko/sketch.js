var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies;


var engine, world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 10;
var rows = 11;

var bottomBound;

function setup() {
	createCanvas(600, 800);
	engine = Engine.create();
	world = engine.world;
	//Engine.run(engine);
	colorMode(HSB);
	var spacing = width / cols;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {

			var x = i * spacing;
			if (j % 2 == 0) x += spacing / 2;

			var y = spacing + j * spacing
			var p = new Plinko(x, y, 16);
			plinkos.push(p);
		}
	}

	for (var i = 0; i < cols + 1; i++) {
		var x = i * spacing;
		var h = 100;
		var w = 10;
		var y = height - h / 2;
		var b = new Boundary(x, y, w, h);
		bounds.push(b);
	}


	bottomBound = new Boundary(width / 2, height + 50, width, 100);


	newParticle();

}

function newParticle() {
	var p = new Particle(300, 0, 8);
	particles.push(p);
}

function draw() {
	if (frameCount % 20 == 0) {
		newParticle();
	}
	background(0, 0, 0);
	Engine.update(engine);

	for (var i = plinkos.length - 1; i >= 0; i--) {
		plinkos[i].show();

	}

	for (var i = bounds.length - 1; i >= 0; i--) {
		bounds[i].show();

	}

	for (var i = particles.length - 1; i >= 0; i--) {
		particles[i].show();
		if (particles[i].isOffScreen()) {
			World.remove(world, particles[i].body);
			particles.splice(i, 1);
		}
	}

	bottomBound.show();

}
