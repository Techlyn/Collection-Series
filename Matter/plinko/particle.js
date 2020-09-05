function Particle(x, y, r) {

    this.hue = random(360);


    var options = {
        restitution: 0.3,
        friction: 0.0,
        density: 1
    }

    x += random(-1, 1);
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);


    Particle.prototype.show = function () {
        fill(this.hue, 200, 255);
        noStroke();
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        ellipseMode(CENTER);
        ellipse(0, 0, this.r * 2);
        pop();
    }

    Particle.prototype.isOffScreen = function () {
        var x = this.body.position.x;
        var y = this.body.position.y;
        if (x < -50 || x > width + 50 || y > height + 50);
    }
}