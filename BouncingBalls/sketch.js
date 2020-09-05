
var balls = [];
var totalBalls = 80;

function setup() {
  createCanvas(1440, 640);
  for (let i = 0; i < totalBalls; i++) {
    var diameter = random(12, 36)

    balls[i] = new Ball(random(0 + diameter / 2, width - diameter / 2), random(0 + diameter / 2, height - diameter / 2), diameter, i);

    

  }
  
  for (let i = 0; i < totalBalls; i++){
  
   balls[i].checkSpawnLocation(balls, i);
  
  }
}

function draw() {
  background(220);
  
  
//  let camx = balls[0].pos.x;
//  let camy = balls[0].pos.y;
//  translate(width / 2, height / 2);
//  translate(-camx, -camy);
  
  fill(255);
  rect(0, 0, width, height);
  
  for (let i = 0; i < totalBalls; ++i){
    balls[i].checkCollision(balls, i);
    balls[i].update()
  }

}



class Ball {
  
  constructor(xIn, yIn, dIn, name) {
    this.pos = createVector(xIn, yIn);
    this.d = dIn;
    this.r = dIn/2;
    this.name = "Ball: " + name;
    var speedVar = 0.1;
    this.speed = createVector(random(-speedVar, speedVar), random(-speedVar, speedVar));
    
    this.mass = 10;
    
    this.colour = [random(0, 255), random(0, 255), random(0, 255)];

  }


  
  

 

  update() {
    
    this.pos.x += this.speed.x * deltaTime;
    this.pos.y += this.speed.y* deltaTime;
    
    if (this.pos.x <= this.r && this.speed.x < 0) {
      this.speed.x = -this.speed.x;

    }
    if (this.pos.x >= width - this.r && this.speed.x > 0) {
      this.speed.x = -this.speed.x;

    }

    if (this.pos.y <= this.r && this.speed.y < 0) {
      this.speed.y = -this.speed.y;

    }

    if (this.pos.y >= height - this.r && this.speed.y > 0) {
      this.speed.y = -this.speed.y;
 

    }
    
    stroke(0);
    fill(this.colour);
    circle(this.pos.x, this.pos.y, this.d);
    textSize(11);
    fill(0)
    //line(this.pos.x, this.pos.y, this.lineDirection(this.pos.x, this.speed.x), this.lineDirection(this.pos.y, this.speed.y));
    

  }
  
  lineDirection(direction, speed){
  
    return(direction+speed*this.r*this.d);
  
  }

  checkCollision(ball, i) {

    for (let j = 0; j < totalBalls; ++j) {

      if (j != i) {

        
        if (this.pos.x + this.r + ball[j].r > ball[j].pos.x 
            && this.pos.x < ball[j].pos.x + this.r + ball[j].r
            && this.pos.y + this.r + ball[j].r > ball[j].pos.y
            && this.pos.y < ball[j].pos.y + this.r + ball[j].r){
        
          var distanceBetweenBalls = this.distanceTo(this,ball[j]);
          
          if (distanceBetweenBalls < this.r + ball[j].r){
            //this.ball's new velocity based off collision
            this.calcNewVel(ball[j], i)      
          }
        }
          
          //point of collision 
          //let collisionPointX = ((this.pos.x * ball[j].d/2) + (ball[j].pos.x * this.d/2))/(this.d/2 + ball[j].d/2);
          //let collsionPointY = ((this.pos.y * ball[j].d/2) + (ball[j].pos.y * this.d/2))/(this.d/2 + ball[j].d/2);
          
      } 
    }
  }
  
  
  distanceTo(ball1,ball2){
    var distance = sqrt(sq(ball1.pos.x - ball2.pos.x) + sq(ball1.pos.y - ball2.pos.y));
    if (distance < 0 ) { distance *= -1 }
    return distance;
  }
  
  
  calcNewVel(ball, i){
          

          var angle = atan(this.pos.y - ball.pos.y, this.pos.x - ball.pos.x);
          
      if (angle < 0 ){ angle *= -1 }      
      
          let distanceBetweenBalls = this.distanceTo(this,ball);
          let distanceToMove = ball.d + this.d - distanceBetweenBalls;






          var tangentVector = createVector();
          tangentVector.y = -(this.pos.x - ball.pos.x);
          tangentVector.x = this.pos.y - ball.pos.y;

          tangentVector.normalize();

          
          var relativeVelocity = createVector(ball.speed.x - this.speed.x, ball.speed.y - this.speed.y);

          var length = tangentVector.dot(relativeVelocity);

          var velocityComponentOnTangent = createVector(tangentVector * length);

          var velocityComponentPerpendicularToTangent = createVector(relativeVelocity.x - velocityComponentOnTangent.x, relativeVelocity.y - velocityComponentOnTangent.y);


          ball.speed.x -= velocityComponentPerpendicularToTangent.x;
          ball.speed.y -= velocityComponentPerpendicularToTangent.y;
          
         // ball.pos.x += cos(angle) * distanceBetweenBalls;
         // ball.pos.y += cos(angle) * distanceBetweenBalls;
      
          this.speed.x += velocityComponentPerpendicularToTangent.x;
          this.speed.y += velocityComponentPerpendicularToTangent.y;  
    
          //this.pos.x += cos(angle) * distanceBetweenBalls;
          //this.pos.y += cos(angle) * distanceBetweenBalls;
  }
  
  checkSpawnLocation(balls, i){
    
    for (let j = 0; j < totalBalls; ++j){
      if (j != i){
        
        let distanceBetweenBalls = sqrt(sq(this.pos.x - balls[j].pos.x) + sq(this.pos.y - balls[j].pos.y));
    
        if (distanceBetweenBalls < this.r + balls[j].r){
            //checks to see where ball is spawned
                  this.pos.x = random(this.r,width-this.r);
                  this.pos.y = random(this.r, height-this.r);
        
            
        }        
        
      }
    }
  }
  


  





}


          

