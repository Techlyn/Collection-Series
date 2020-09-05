function Boundary(x, y, w, h) {

    var options = {
        friction: 0,
        restitution: 0.1,
        isStatic: true,

    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);


    this.show = function () {
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        noStroke();
        fill(0);
        rect(0, 0, this.w, this.h);
        pop();
    }
}