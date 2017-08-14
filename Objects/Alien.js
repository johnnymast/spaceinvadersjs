class Alien {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.hp = 100;
        this.hitDammage = 20;
        this.fill = 'white';
    }

    DecreaseHealth() {
        this.hp -= this.hitDammage;
    }

    IsDead() {
        return (this.hp <= 0);
    }

    Draw() {

        fill(this.fill);

        var src = 'Assets/Sprite Images/InvaderA_00.png';
        image(src, this.x, this.y, this.width, this.height, 0, 0);
    }

    InterSectsWith(x, y) {
        if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height) {
            return true;
        }
        return false;
    }
}