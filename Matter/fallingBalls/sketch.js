var Engine = Matter.Engine,
	//Render = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies;

var engine;
var circles = [];
var boundaries = [];
var world;




function setup() {
	createCanvas(400, 400);
	engine = Engine.create();
	world = engine.world;
	//Engine.run(engine);
	boundaries.push(new Boundary(150, 200, 240, 15, 0.3));
	boundaries.push(new Boundary(300, 300, 300, 15, -0.3));

	World.add(world, boundaries);

}

function draw() {
	background(51);
	Engine.update(engine);
	circles.push(new Circle(width / 2, 50, random(5, 10)));
	for (var i = circles.length - 1; i >= 0; i--) {
		circles[i].show();
		if (circles[i].isOffScreen()) {
			circles[i].removeFromWorld();
			circles.splice(i, 1);

		}
	}

	for (var i = 0; i < boundaries.length; i++)
		boundaries[i].show();

}

// function mouseDragged() {
// 	circles.push(new Circle(mouseX, mouseY, random(5, 10)));
// }