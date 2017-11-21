export default class SpriteSheet {
    constructor(img, width, height, positions) {
        this.img = img;
        this.width = width;
        this.height = height;
        this.positions = positions;
    }

    Draw(position, x, y) {
        var pos = this.positions[position];
        image(
            this.img,
            x, y,
            this.width,
            this.height,
            pos[0],
            pos[1]
        );
    }

    DrawExtra(x, y, w, h, dx, dy) {
        image(
            this.img,
            x, y,
            w,
            h,
            dx,
            dy
        );
    }
}