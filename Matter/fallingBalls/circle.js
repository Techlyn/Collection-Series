function Circle(x, y, w) {

    var options = {
        friction: 0.0,
        restitution: 0.3,

    }

    this.body = Bodies.circle(x, y, w, options);
    this.r = w;
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