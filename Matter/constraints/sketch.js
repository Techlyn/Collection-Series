var Engine = Matter.Engine,
	//Render = Matter.Render,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Constraint = Matter.Constraint,
	Mouse = Matter.Mouse,
	MouseConstraint = Matter.MouseConstraint;

var engine;
var particles = [];
var boundaries = [];
var world;

var mConstraint;





function setup() {
	var canvas = createCanvas(400, 400);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

	mConstraint = MouseConstraint.create(engine);

	var prev = null;
	for (var x = width / 2; x < 400; x += 20) {
		var fixed = false;
		if (!prev) {
			fixed = true;
		}
		var p = new Particle(x, 100, 10, fixed);
		particles.push(p);

		if (prev) {
			var options = {

				bodyA: p.body,
				bodyB: prev.body,
				length: 20,
				stiffness: 0.2,
			}


			var constraint = Constraint.create(options);
			World.add(world, constraint);
		}
		prev = p;



	}


	boundaries.push(new Boundary(width / 2, height, width, 15));
	World.add(world, boundaries);

	var canvasMouse = Mouse.create(canvas.elt);
	canvasMouse.pixelRatio = pixelDensity();
	var options = {
		mouse: canvasMouse,
	}
	mConstraint = MouseConstraint.create(engine, options);

	World.add(world, mConstraint);





}

function draw() {
	background(51);
	//Engine.update(engine);

	for (var i = 0; i < particles.length; i++) {
		particles[i].show();
	}


	for (var i = 0; i < boundaries.length; i++)
		boundaries[i].show();

	if (mConstraint.body) {
		var pos = mConstraint.body.position;
		var offset = mConstraint.constraint.pointB;
		var m = mConstraint.mouse.position;
		stroke(0, 255, 0);
		line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
	}


}

// function mouseDragged() {
// 	circles.push(new Circle(mouseX, mouseY, random(5, 10)));
// }