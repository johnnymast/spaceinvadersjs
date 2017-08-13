class Player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velx = 0;
        this.vely = 0;
    }

    Draw() {

        if (this.velx != 0) {
            this.x += this.velx;
        }
        if (this.vely != 0) {
            this.y += this.vely;
        }

        var src = 'Assets/Sprite Images/Ship.png';
        image(src, this.x, this.y, this.w, this.h,0,0);
//        rect(this.x, this.y, this.w, this.h);
    }
}