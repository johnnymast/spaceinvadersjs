class MouseInput {

    constructor() {
        this.DIRECTON_LEFT  = 0;
        this.DIRECTON_RIGHT = 1;
        this.DIRECTON_UP    = 2;
        this.DIRECTON_DOWN  = 3;
        this.DIRECTON_HALTED = 4;
        this.direction = this.DIRECTON_HALTED;
        this.clicked = false;
        this.lastx  = 0;
        this.lasty  = 0;

        var self = this;

        document.addEventListener('mousemove', function(event) {
            var currentX = event.clientX;
            var currentY = event.clientY;

            if (self.lastx > 0 || self.lasty > 0) {
                if (currentX > self.lastx) {
                    self.direction = self.DIRECTON_RIGHT;
                } else
                if (currentX < self.lastx) {
                    self.direction = self.DIRECTON_LEFT;
                }

                if (currentY < self.lasty) {
                    self.direction = self.DIRECTON_DOWN;
                } else
                if (currentY > self.lasty) {
                    self.direction = self.DIRECTON_UP;
                }
            }

            self.lastx = currentX;
            self.lasty = currentY;
            self.currentX = currentX;
            self.currentY = currentY;
        }, false);

        document.addEventListener('click', function(event) {
            self.clicked = true;
        }, false);
    }

    getDirection() {
        var direction  = this.direction;
        this.direction = this.DIRECTON_HALTED;
        return direction
    }

    didClick() {
        var clicked = this.clicked;
        this.clicked = false;
        return clicked;
    }
}