class Bullet {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vely = 4;
    }


    Update() {
        this.y -= this.vely;
    }

    Draw() {
        rect(this.x, this.y, this.h, this.w);
    }
}