function Plinko(x, y, r) {



    var options = {
        isStatic: true,
        restitution: 0,
        friction: 0,

    }

    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);


    Plinko.prototype.show = function () {
        fill(360, 0, 255);
        noStroke();
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        ellipseMode(CENTER);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}