class Alien {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    Draw() {
        var src = 'Assets/Sprite Images/InvaderA_00.png';
        image(src, this.x, this.y, this.w, this.h, 0, 0);
    }
}