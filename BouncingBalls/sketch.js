var balls = [];
var totalBalls = 300;
var iteration = 0;
var ballSafe = 0;

var spawnCheckBool = true;

function setup() {
  createCanvas(720, 480);
  //intiates the an array of balls
  for (let i = 0; i < totalBalls; i++) {
    var diameter = random(12, 36);
    diameter = floor(diameter);
    balls[i] = new Ball(
      random(0 + diameter / 2, width - diameter / 2),
      random(0 + diameter / 2, height - diameter / 2),
      diameter,
      i
    );
  }

  //this is a check to see if any balls have spawned in with another,
  //i reckon i could through it into the ball intiation for loop, but that's
  //for another day.
  while (spawnCheckBool) {
    for (let i = 0; i < totalBalls; i++) {
      balls[i].changeSpawnLocation(balls, i);
    }

    print("numbers of iterations: " + iteration);

    if (ballSafe >= totalBalls) {
      spawnCheckBool = false;
    } else {
      ballSafe = 0;
    }
  }
}



function draw() {
  background(51);
  

  for (let i = 0; i < totalBalls; ++i) {
    balls[i].checkCollision(balls, i);
    balls[i].edges();
    balls[i].update();
    balls[i].display();
  }
}

class Ball {
  constructor(xIn, yIn, dIn, name) {
    this.pos = createVector(xIn, yIn);
    this.d = dIn;
    this.r = dIn / 2;
    this.mass = this.d;

    let speedVar = 1;

    this.vel = createVector(
      random(-speedVar, speedVar),
      random(-speedVar, speedVar)
    );
    
    this.acc = createVector();
    this.colour = [random(0, 255), random(0, 255), random(0, 255)];
  }
  
  applyForce(force){
    let f = force/this.mass
    this.acc.add(f);
  }

  
  update() {
    this.pos.add(this.vel);
  }

  //Boundary checking if balls try to go past 'walls'
  edges() {
    if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }

    if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }

    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
  }

  display() {
    stroke(255);
    fill(this.colour,150);
    ellipse(this.pos.x, this.pos.y, this.d);
  }

  //checks to see when two balls collide, if there is a collision,
  //will call moveCollision and bounceCollision
  checkCollision(ball, i) {
    for (let j = 0; j < totalBalls; ++j) {
      if (ball[j].pos != this.pos) {
        let distanceBetweenBalls = p5.Vector.dist(this.pos, ball[j].pos);
        if (distanceBetweenBalls < this.r + ball[j].r) {
          //this.ball's new velocity based off collision
          this.moveCollision(ball[j]);
          this.bounceCollision(ball[j]);
        }
      }
    }
  }

  //this moves the ball in a way that prevents the balls from overlapping
  //and stops them from getting stuck together, it does this by working out
  //how far away the balls have to move in order for it to be "unstuck"
  //NOTE: This is only applied to one of the balls.
  moveCollision(ball) {
    let angle = atan(ball.pos.y - this.pos.y, ball.pos.y, this.pos.y);

    let distanceBetweenBalls = p5.Vector.dist(ball.pos, this.pos);

    let distanceToMove = ball.r + this.r - distanceBetweenBalls;

    ball.pos.x += cos(angle) * distanceToMove;
    ball.pos.y += sin(angle) * distanceToMove;
  }

  //the fancy bounce collision that springs them around like balls on a snooker table
  //to put it in a nutshell, it treats the collision as a flat surface and applies a 
  //new trajectory to both balls, i still don't fully understand the math behind it.
  bounceCollision(ball) {
    var tangentVector = createVector();
    tangentVector.y = -(this.pos.x - ball.pos.x);
    tangentVector.x = this.pos.y - ball.pos.y;

    tangentVector.normalize();

    var relativeVelocity = p5.Vector.sub(ball.vel, this.vel);
    var length = p5.Vector.dot(tangentVector, relativeVelocity);
    var velocityComponentOnTangent = p5.Vector.mult(tangentVector, length);
    var velocityComponentPerpendicularToTangent = p5.Vector.sub(
      relativeVelocity,
      velocityComponentOnTangent
    );

    ball.vel.x -= velocityComponentPerpendicularToTangent.x;
    ball.vel.y -= velocityComponentPerpendicularToTangent.y;

    this.vel.x += velocityComponentPerpendicularToTangent.x;
    this.vel.y += velocityComponentPerpendicularToTangent.y;
  }

  //checks to see if the ball is spawned inside another ball, if a ball is overlaped
  //then it will randomly spawn the ball till it no longer overlaps, goes through 
  //recursion till all balls are 'safe' which'll break it out of it's while loop
  changeSpawnLocation(balls, i) {
    for (let j = 0; j < totalBalls; ++j) {
      if (j != i) {
        let distanceBetweenBalls = p5.Vector.dist(this.pos, balls[j].pos);

        if (distanceBetweenBalls < this.r + balls[j].r) {
          this.pos.x = random(this.r, width - this.r);
          this.pos.y = random(this.r, height - this.r);
          iteration++;
            //if it's taking to long to get out of the for loops, it'll force
          //it's way out and run the code, allowing a stop
          if(iteration >= 1000){
            spawnCheckBool = true;
            return;
          }
          this.changeSpawnLocation(balls, i);
          
        
          
          
        }
      }
    }
    ballSafe++;
  }
}
