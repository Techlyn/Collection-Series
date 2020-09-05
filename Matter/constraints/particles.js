function Particle(x, y, r, fixed) {

    var options = {
        friction: 0.0,
        restitution: 0.95,
        isStatic: fixed,

    }

    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);


    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);

        stroke(255);
        strokeWeight(1);
        fill(170);
        ellipse(0, 0, this.r * 2, this.r * 2);
        line(0, 0, this.r, 0);
        pop();
    }

    this.isOffScreen = function () {
        var pos = this.body.position;
        return (pos.y > height + 100);
    };

    this.removeFromWorld = function () {
        World.remove(world, this.body);
    }
}